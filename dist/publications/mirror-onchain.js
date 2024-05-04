"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnchainMirrorTypedData = void 0;
const util_1 = __importDefault(require("util"));
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createOnchainMirrorTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateOnchainMirrorTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createOnchainMirrorTypedData;
};
exports.createOnchainMirrorTypedData = createOnchainMirrorTypedData;
const mirrorOnChain = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('mirror onchain: address', address);
    await (0, login_1.login)(address);
    // TODO! in docs make sure we talk about onchain referrals
    const request = {
        mirrorOn: known_common_input_constants_1.knownPostId,
        metadataURI: 'ipfs://324324',
    };
    const { id, typedData } = await (0, exports.createOnchainMirrorTypedData)(request);
    console.log('mirror onchain: result', { id, typedData });
    console.log('mirror onchain: typedData', util_1.default.inspect(typedData, { showHidden: false, depth: null }));
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('mirror onchain: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'Mirror');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.mirrorWithSig({
            profileId: typedData.value.profileId,
            metadataURI: typedData.value.metadataURI,
            pointedProfileId: typedData.value.pointedProfileId,
            pointedPubId: typedData.value.pointedPubId,
            referrerProfileIds: typedData.value.referrerProfileIds,
            referrerPubIds: typedData.value.referrerPubIds,
            referenceModuleData: typedData.value.referenceModuleData,
        }, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('mirror onchain: tx hash', tx.hash);
    }
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await mirrorOnChain();
    }
})();
