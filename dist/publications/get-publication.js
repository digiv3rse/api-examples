"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublication = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const getPublicationRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.publication;
};
const getPublication = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    await (0, login_1.login)(address);
    const result = await getPublicationRequest({
        forId: known_common_input_constants_1.knownPostId,
    });
    console.log('publication: result', result);
    return result;
};
exports.getPublication = getPublication;
(async () => {
    await (0, exports.getPublication)();
})();
