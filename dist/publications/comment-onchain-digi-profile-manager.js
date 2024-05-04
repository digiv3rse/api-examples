"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnChainDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const commentOnChain = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CommentOnchainDocument,
        variables: {
            request,
        },
    });
    return result.data.commentOnchain;
};
const commentOnChainDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('comment onchain digi profile manager: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('comment onchain: ipfs result', ipfsResult);
    // TODO! in docs make sure we talk about onchain referrals
    const request = {
        commentOn: known_common_input_constants_1.knownPostId,
        contentURI: `ipfs://${ipfsResult.path}`,
        // you can play around with open actions modules here all request
        // objects are in `publication-open-action-options.ts`
        // openActionModules: [simpleCollectAmountAndLimit(address)],
        //
        // you can play around with reference modules here
        // all request objects are in `publication-reference-module-options.ts`,
        // referenceModule: referenceModuleFollowOnly,
    };
    const result = await commentOnChain(request);
    console.log('comment onchain digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unblock');
};
exports.commentOnChainDiGiProfileManager = commentOnChainDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.commentOnChainDiGiProfileManager)();
    }
})();
