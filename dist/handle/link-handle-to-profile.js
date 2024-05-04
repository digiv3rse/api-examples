"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const digi_token_handle_registry_1 = require("../digi-token-handle-registry");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createLinkHandleToProfileTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateLinkHandleToProfileTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createLinkHandleToProfileTypedData;
};
const link = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('link handle to profile:: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await createLinkHandleToProfileTypedData({
        handle: 'test/wagmi',
    });
    console.log('link handle to profile:: result', { id, typedData });
    console.log('link handle to profile:: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('link handle to profile:: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'link handle to profile:');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_token_handle_registry_1.digiTokenHandleRegistry.linkWithSig(typedData.value.handleId, typedData.value.profileId, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('link handle to profile:: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.link = link;
(async () => {
    await (0, exports.link)();
})();
