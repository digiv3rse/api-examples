"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revenueFromPublications = exports.revenueFromPublicationsRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const revenueFromPublicationsRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.RevenueFromPublicationsDocument,
        variables: {
            request,
        },
    });
    return result.data.revenueFromPublications;
};
exports.revenueFromPublicationsRequest = revenueFromPublicationsRequest;
const revenueFromPublications = async () => {
    const result = await (0, exports.revenueFromPublicationsRequest)({
        for: known_common_input_constants_1.knownPostId,
    });
    console.log('publications profile revenues: result', result);
    return result;
};
exports.revenueFromPublications = revenueFromPublications;
(async () => {
    await (0, exports.revenueFromPublications)();
})();
