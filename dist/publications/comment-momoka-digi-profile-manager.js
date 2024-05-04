"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnMomokaDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaCommentWithDiGiManager = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CommentOnMomokaDocument,
        variables: {
            request,
        },
    });
    return result.data.commentOnMomoka;
};
const createCommentOnMomoka = async (createMomokaCommentRequest) => {
    const dispatcherResult = await createMomokaCommentWithDiGiManager(createMomokaCommentRequest);
    console.log('create momoka comment via digi-manager: createMomokaCommentWithDiGiManager', dispatcherResult);
    return dispatcherResult;
};
const commentOnMomokaDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka comment: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('comment momoka: ipfs result', ipfsResult);
    const request = {
        contentURI: `ipfs://${ipfsResult.path}`,
        commentOn: known_common_input_constants_1.knownMomokaPostId,
    };
    const result = await createCommentOnMomoka(request);
    console.log('create momoka comment created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka comment failed', result);
        return;
    }
    // TODO! Fix MOMOKA proof
    // const valid = await checkProofs(result.proof);
    // console.log('create DA post: valid', valid);
    return result;
};
exports.commentOnMomokaDiGiProfileManager = commentOnMomokaDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.commentOnMomokaDiGiProfileManager)();
    }
})();
