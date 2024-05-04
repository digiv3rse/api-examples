"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOnMomoka = exports.signCreateMomokaPostTypedData = exports.createMomokaPostTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const ipfs_1 = require("../ipfs");
const generated_1 = require("../graphql/generated");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaPostTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateMomokaPostTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createMomokaPostTypedData;
};
exports.createMomokaPostTypedData = createMomokaPostTypedData;
const signCreateMomokaPostTypedData = async (request) => {
    const result = await (0, exports.createMomokaPostTypedData)(request);
    console.log('create momoka post: createMomokaPostTypedData', result);
    const typedData = result.typedData;
    console.log('create momoka post: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('create momoka post: signature', signature);
    return { result, signature };
};
exports.signCreateMomokaPostTypedData = signCreateMomokaPostTypedData;
const createPostOnMomoka = async (momokaPostRequest) => {
    const signedResult = await (0, exports.signCreateMomokaPostTypedData)(momokaPostRequest);
    console.log('create momoka post via broadcast: signedResult', signedResult);
    const broadcastResult = await (0, shared_broadcast_1.broadcastOnMomokaRequest)({
        id: signedResult.result.id,
        signature: signedResult.signature,
    });
    if (broadcastResult.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka post via broadcast: failed', broadcastResult);
        throw new Error('create momoka post via broadcast: failed');
    }
    console.log('create momoka post via broadcast: broadcastResult', broadcastResult);
    return broadcastResult;
};
const postOnMomoka = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka post: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('post momoka: ipfs result', ipfsResult);
    const request = {
        contentURI: `ipfs://${ipfsResult.path}`,
    };
    // hard coded to make the code example clearer
    const result = await createPostOnMomoka(request);
    console.log('create momoka post created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka post failed', result);
        return;
    }
    // TODO!: Check momoka proof
    // const valid = await checkProofs(result.proof);
    // console.log('create momoka post: valid', valid);
    return result;
};
exports.postOnMomoka = postOnMomoka;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.postOnMomoka)();
    }
})();
