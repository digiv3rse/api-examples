"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOnMomokaDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const ipfs_1 = require("../ipfs");
const generated_1 = require("../graphql/generated");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaPostWithDiGiManager = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.PostOnMomokaDocument,
        variables: {
            request,
        },
    });
    return result.data.postOnMomoka;
};
const createPostOnMomoka = async (createMomokaPostRequest) => {
    const result = await createMomokaPostWithDiGiManager(createMomokaPostRequest);
    console.log('create momoka post with digi-manager: createMomokaPostWithDiGiManager', result);
    return result;
};
const postOnMomokaDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka post: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('post momoka: ipfs result', ipfsResult);
    const request = {
        contentURI: `ipfs://${ipfsResult.path}`,
    };
    const result = await createPostOnMomoka(request);
    console.log('create momoka post created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka post failed', result);
        return;
    }
    // TODO! Fix MOMOKA proof
    // const valid = await checkProofs(result.proof);
    // console.log('create DA post: valid', valid);
    return result;
};
exports.postOnMomokaDiGiProfileManager = postOnMomokaDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.postOnMomokaDiGiProfileManager)();
    }
})();
