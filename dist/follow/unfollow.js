"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollow = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createUnfollowTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateUnfollowTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createUnfollowTypedData;
};
const unfollow = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('unfollow: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await createUnfollowTypedData({ unfollow: [known_common_input_constants_1.knownProfileId] });
    console.log('unfollow: result', { id, typedData });
    console.log('unfollow: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('unfollow: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'unfollow');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.unfollowWithSig(typedData.value.unfollowerProfileId, typedData.value.idsOfProfilesToUnfollow, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('unfollow: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.unfollow = unfollow;
(async () => {
    await (0, exports.unfollow)();
})();
