"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlink = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const digi_token_handle_registry_1 = require("../digi-token-handle-registry");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createUnlinkHandleFromProfileTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateUnlinkHandleFromProfileTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createUnlinkHandleFromProfileTypedData;
};
const unlink = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('unlink handle from profile: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await createUnlinkHandleFromProfileTypedData({
        handle: 'test/wagmi',
    });
    console.log('unlink handle from profile: result', { id, typedData });
    console.log('unlink handle from profile: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('unlink handle from profile: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'unlink handle from profile');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_token_handle_registry_1.digiTokenHandleRegistry.unlinkWithSig(typedData.value.handleId, typedData.value.profileId, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('unlink handle from profile: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.unlink = unlink;
(async () => {
    await (0, exports.unlink)();
})();
