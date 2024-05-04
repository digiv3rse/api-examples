"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.follow = exports.createFollowTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createFollowTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateFollowTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createFollowTypedData;
};
exports.createFollowTypedData = createFollowTypedData;
const follow = async (profileId = known_common_input_constants_1.knownProfileId) => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('follow: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await (0, exports.createFollowTypedData)({
        follow: [
            {
                profileId: profileId,
            },
        ],
    });
    console.log('follow: result', { id, typedData });
    console.log('follow: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('follow: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'follow');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.followWithSig(typedData.value.followerProfileId, typedData.value.idsOfProfilesToFollow, typedData.value.followTokenIds, typedData.value.datas, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('follow: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.follow = follow;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.follow)();
    }
})();
