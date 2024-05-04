"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteOnMomoka = exports.signCreateMomokaQuoteTypedData = exports.createMomokaQuoteTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaQuoteTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateMomokaQuoteTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createMomokaQuoteTypedData;
};
exports.createMomokaQuoteTypedData = createMomokaQuoteTypedData;
const signCreateMomokaQuoteTypedData = async (request) => {
    const result = await (0, exports.createMomokaQuoteTypedData)(request);
    console.log('create momoka quote: createMomokaQuoteTypedData', result);
    const typedData = result.typedData;
    console.log('create momoka quote: typedData', JSON.stringify(typedData, null, 2));
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('create momoka quote: signature', signature);
    return { result, signature };
};
exports.signCreateMomokaQuoteTypedData = signCreateMomokaQuoteTypedData;
const createQuoteOnMomoka = async (momokaQuoteRequest) => {
    const signedResult = await (0, exports.signCreateMomokaQuoteTypedData)(momokaQuoteRequest);
    console.log('create momoka quote via broadcast: signedResult', signedResult);
    const broadcastResult = await (0, shared_broadcast_1.broadcastOnMomokaRequest)({
        id: signedResult.result.id,
        signature: signedResult.signature,
    });
    if (broadcastResult.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka quote via broadcast: failed', broadcastResult);
        throw new Error('create momoka quote via broadcast: failed');
    }
    console.log('create momoka quote via broadcast: broadcastResult', broadcastResult);
    return broadcastResult;
};
const quoteOnMomoka = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka quote: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('quote momoka: ipfs result', ipfsResult);
    const request = {
        contentURI: `ipfs://${ipfsResult.path}`,
        quoteOn: known_common_input_constants_1.knownMomokaPostId,
    };
    // hard coded to make the code example clearer
    const result = await createQuoteOnMomoka(request);
    console.log('create momoka quote created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka quote failed', result);
        return;
    }
    // TODO!: Check momoka proof
    // const valid = await checkProofs(result.proof);
    // console.log('create momoka quote: valid', valid);
    return result;
};
exports.quoteOnMomoka = quoteOnMomoka;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.quoteOnMomoka)();
    }
})();
