"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshPublicationMetadata = exports.refreshPublicationMetadataApi = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const refreshPublicationMetadataApi = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.RefreshPublicationMetadataDocument,
        variables: {
            request,
        },
    });
    return result.data.refreshPublicationMetadata;
};
exports.refreshPublicationMetadataApi = refreshPublicationMetadataApi;
const refreshPublicationMetadata = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('refresh publication: address', address);
    await (0, login_1.login)(address);
    await (0, exports.refreshPublicationMetadataApi)({
        for: known_common_input_constants_1.knownPostId,
    });
    console.log('refresh publication: success');
};
exports.refreshPublicationMetadata = refreshPublicationMetadata;
(async () => {
    await (0, exports.refreshPublicationMetadata)();
})();
