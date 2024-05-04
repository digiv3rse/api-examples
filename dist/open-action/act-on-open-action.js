"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actOn = exports.createActOnOpenActionTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createActOnOpenActionTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateActOnOpenActionTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createActOnOpenActionTypedData;
};
exports.createActOnOpenActionTypedData = createActOnOpenActionTypedData;
const actOn = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('act on: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await (0, exports.createActOnOpenActionTypedData)({
        for: config_1.POST_ID || '0x03-0x4b',
        actOn: {
            simpleCollectOpenAction: true,
        },
    });
    console.log('act on: result', { id, typedData });
    console.log('act on: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('act on: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'act on');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.actWithSig({
            publicationActedProfileId: typedData.value.publicationActedProfileId,
            publicationActedId: typedData.value.publicationActedId,
            actorProfileId: typedData.value.actorProfileId,
            referrerProfileIds: typedData.value.referrerProfileIds,
            referrerPubIds: typedData.value.referrerPubIds,
            actionModuleAddress: typedData.value.actionModuleAddress,
            actionModuleData: typedData.value.actionModuleData,
        }, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('act on: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.actOn = actOn;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.actOn)();
    }
})();
