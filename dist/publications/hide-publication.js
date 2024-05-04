"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePublication = exports.deletePublicationRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const deletePublicationRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.HidePublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.hidePublication;
};
exports.deletePublicationRequest = deletePublicationRequest;
const deletePublication = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('delete publication: address', address);
    await (0, login_1.login)(address);
    await (0, exports.deletePublicationRequest)({
        for: known_common_input_constants_1.knownPostId,
    });
    console.log('delete publication: success');
};
exports.deletePublication = deletePublication;
(async () => {
    await (0, exports.deletePublication)();
})();
