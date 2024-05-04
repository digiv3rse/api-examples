"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnchainQuoteTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createOnchainQuoteTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateOnchainQuoteTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createOnchainQuoteTypedData;
};
exports.createOnchainQuoteTypedData = createOnchainQuoteTypedData;
const quoteOnChain = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('quote onchain: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('quote onchain: ipfs result', ipfsResult);
    // TODO! in docs make sure we talk about onchain referrals
    const request = {
        quoteOn: known_common_input_constants_1.knownPostId,
        contentURI: `ipfs://${ipfsResult.path}`,
        // you can play around with open actions modules here all request
        // objects are in `publication-open-action-options.ts`
        // openActionModules: [simpleCollectAmountAndLimit(address)],
        //
        // you can play around with reference modules here
        // all request objects are in `publication-reference-module-options.ts`,
        // referenceModule: referenceModuleFollowOnly,
    };
    const { id, typedData } = await (0, exports.createOnchainQuoteTypedData)(request);
    console.log('quote onchain: result', { id, typedData });
    const jsonString = JSON.stringify(typedData, null, 2);
    console.log(jsonString);
    console.log('quote onchain: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('quote onchain: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'Quote');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.quoteWithSig({
            profileId: typedData.value.profileId,
            contentURI: typedData.value.contentURI,
            pointedProfileId: typedData.value.pointedProfileId,
            pointedPubId: typedData.value.pointedPubId,
            referrerProfileIds: typedData.value.referrerProfileIds,
            referrerPubIds: typedData.value.referrerPubIds,
            referenceModuleData: typedData.value.referenceModuleData,
            actionModules: typedData.value.actionModules,
            actionModulesInitDatas: typedData.value.actionModulesInitDatas,
            referenceModule: typedData.value.referenceModule,
            referenceModuleInitData: typedData.value.referenceModuleInitData,
        }, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        }
        // { gasLimit: 10000000 }
        );
        console.log('quote onchain: tx hash', tx.hash);
    }
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await quoteOnChain();
    }
})();
