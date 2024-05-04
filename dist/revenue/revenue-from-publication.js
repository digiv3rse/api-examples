"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revenueForPublication = exports.revenueFromPublicationRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const revenueFromPublicationRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.RevenueFromPublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.revenueFromPublication;
};
exports.revenueFromPublicationRequest = revenueFromPublicationRequest;
const revenueForPublication = async () => {
    const result = await (0, exports.revenueFromPublicationRequest)({
        for: known_common_input_constants_1.knownPostId,
    });
    console.log('publication revenue: result', result);
    return result;
};
exports.revenueForPublication = revenueForPublication;
(async () => {
    await (0, exports.revenueForPublication)();
})();
