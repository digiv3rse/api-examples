"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblock = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createUnblockProfilesTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateUnblockProfilesTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createUnblockProfilesTypedData;
};
const unblock = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('unblock: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await createUnblockProfilesTypedData({ profiles: [known_common_input_constants_1.knownProfileId] });
    console.log('unblock: result', { id, typedData });
    console.log('unblock: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('unblock: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'block');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.setBlockStatusWithSig(typedData.value.byProfileId, typedData.value.idsOfProfilesToSetBlockStatus, typedData.value.blockStatus, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('unblock: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.unblock = unblock;
(async () => {
    await (0, exports.unblock)();
})();
