"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirrorOnMomokaDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const known_common_input_constants_1 = require("../known-common-input-constants");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
const createMomokaMirrorWithDiGiManager = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.MirrorOnMomokaDocument,
        variables: {
            request,
        },
    });
    return result.data.mirrorOnMomoka;
};
const createMirrorOnMomoka = async (createMomokaMirrorRequest) => {
    const dispatcherResult = await createMomokaMirrorWithDiGiManager(createMomokaMirrorRequest);
    console.log('create momoka mirror via digi-manager: createMomokaMirrorWithDiGiManager', dispatcherResult);
    return dispatcherResult;
};
const mirrorOnMomokaDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create momoka mirror: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)(publication_metadata_mocks_1.publicationMetadataTextOnly);
    console.log('mirror momoka: ipfs result', ipfsResult);
    const request = {
        mirrorOn: known_common_input_constants_1.knownMomokaPostId,
    };
    const result = await createMirrorOnMomoka(request);
    console.log('create momoka mirror created', result);
    if (result.__typename !== 'CreateMomokaPublicationResult') {
        console.error('create momoka mirror failed', result);
        return;
    }
    // TODO! Fix MOMOKA proof
    // const valid = await checkProofs(result.proof);
    // console.log('create DA post: valid', valid);
    return result;
};
exports.mirrorOnMomokaDiGiProfileManager = mirrorOnMomokaDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.mirrorOnMomokaDiGiProfileManager)();
    }
})();
