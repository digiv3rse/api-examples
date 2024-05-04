"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteOnChainDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const publication_open_action_options_1 = require("./helpers/publication-open-action-options");
const quoteOnChain = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.QuoteOnchainDocument,
        variables: {
            request,
        },
    });
    return result.data.quoteOnchain;
};
const quoteOnChainDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('quote onchain digi profile manager: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('quote onchain: ipfs result', ipfsResult);
    // TODO! in docs make sure we talk about onchain referrals
    const request = {
        quoteOn: known_common_input_constants_1.knownPostId,
        contentURI: `ipfs://${ipfsResult.path}`,
        // you can play around with open actions modules here all request
        // objects are in `publication-open-action-options.ts`
        openActionModules: [(0, publication_open_action_options_1.simpleCollectAmountAndLimit)(address)],
        //
        // you can play around with reference modules here
        // all request objects are in `publication-reference-module-options.ts`,
        // referenceModule: referenceModuleFollowOnly,
    };
    const result = await quoteOnChain(request);
    console.log('quote onchain digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unblock');
};
exports.quoteOnChainDiGiProfileManager = quoteOnChainDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.quoteOnChainDiGiProfileManager)();
    }
})();
