"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followsRevenue = exports.followsRevenueRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const followsRevenueRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.FollowRevenuesDocument,
        variables: {
            request,
        },
    });
    return result.data.followRevenues;
};
exports.followsRevenueRequest = followsRevenueRequest;
const followsRevenue = async () => {
    const result = await (0, exports.followsRevenueRequest)({
        for: known_common_input_constants_1.knownProfileId,
    });
    console.log('profiles follow revenues: result', result);
    return result;
};
exports.followsRevenue = followsRevenue;
(async () => {
    await (0, exports.followsRevenue)();
})();
