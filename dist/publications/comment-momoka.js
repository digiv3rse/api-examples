"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnMomoka = exports.signCreateMomokaCommentTypedData = exports.createMomokaCommentTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaCommentTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateMomokaCommentTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createMomokaCommentTypedData;
};
exports.createMomokaCommentTypedData = createMomokaCommentTypedData;
const signCreateMomokaCommentTypedData = async (request) => {
    const result = await (0, exports.createMomokaCommentTypedData)(request);
    console.log('create momoka comment: createMomokaCommentTypedData', result);
    const typedData = result.typedData;
    console.log('create momoka comment: typedData', JSON.stringify(typedData, null, 2));
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('create momoka comment: signature', signature);
    return { result, signature };
};
exports.signCreateMomokaCommentTypedData = signCreateMomokaCommentTypedData;
const createCommentOnMomoka = async (momokaCommentRequest) => {
    const signedResult = await (0, exports.signCreateMomokaCommentTypedData)(momokaCommentRequest);
    console.log('create momoka comment via broadcast: signedResult', signedResult);
    const broadcastResult = await (0, shared_broadcast_1.broadcastOnMomokaRequest)({
        id: signedResult.result.id,
        signature: signedResult.signature,
    });
    if (broadcastResult.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka comment via broadcast: failed', broadcastResult);
        throw new Error('create momoka comment via broadcast: failed');
    }
    console.log('create momoka comment via broadcast: broadcastResult', broadcastResult);
    return broadcastResult;
};
const commentOnMomoka = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka comment: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('comment momoka: ipfs result', ipfsResult);
    const request = {
        contentURI: `ipfs://${ipfsResult.path}`,
        commentOn: known_common_input_constants_1.knownMomokaPostId,
    };
    // hard coded to make the code example clearer
    const result = await createCommentOnMomoka(request);
    console.log('create momoka comment created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka comment failed', result);
        return;
    }
    // TODO!: Check momoka proof
    // const valid = await checkProofs(result.proof);
    // console.log('create momoka comment: valid', valid);
    return result;
};
exports.commentOnMomoka = commentOnMomoka;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.commentOnMomoka)();
    }
})();
