"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirrorOnMomoka = exports.signCreateMomokaMirrorTypedData = exports.createMomokaMirrorTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaMirrorTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateMomokaMirrorTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createMomokaMirrorTypedData;
};
exports.createMomokaMirrorTypedData = createMomokaMirrorTypedData;
const signCreateMomokaMirrorTypedData = async (request) => {
    const result = await (0, exports.createMomokaMirrorTypedData)(request);
    console.log('create momoka mirror: createMomokaMirrorTypedData', result);
    const typedData = result.typedData;
    console.log('create momoka mirror: typedData', JSON.stringify(typedData, null, 2));
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('create momoka mirror: signature', signature);
    return { result, signature };
};
exports.signCreateMomokaMirrorTypedData = signCreateMomokaMirrorTypedData;
const createMirrorOnMomoka = async (momokaMirrorRequest) => {
    const signedResult = await (0, exports.signCreateMomokaMirrorTypedData)(momokaMirrorRequest);
    console.log('create momoka mirror via broadcast: signedResult', signedResult);
    const broadcastResult = await (0, shared_broadcast_1.broadcastOnMomokaRequest)({
        id: signedResult.result.id,
        signature: signedResult.signature,
    });
    if (broadcastResult.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka mirror via broadcast: failed', broadcastResult);
        throw new Error('create momoka mirror via broadcast: failed');
    }
    console.log('create momoka mirror via broadcast: broadcastResult', broadcastResult);
    return broadcastResult;
};
const mirrorOnMomoka = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka mirror: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('mirror momoka: ipfs result', ipfsResult);
    const request = {
        mirrorOn: known_common_input_constants_1.knownMomokaPostId,
    };
    // hard coded to make the code example clearer
    const result = await createMirrorOnMomoka(request);
    console.log('create momoka mirror created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka mirror failed', result);
        return;
    }
    // TODO!: Check momoka proof
    // const valid = await checkProofs(result.proof);
    // console.log('create momoka mirror: valid', valid);
    return result;
};
exports.mirrorOnMomoka = mirrorOnMomoka;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.mirrorOnMomoka)();
    }
})();
