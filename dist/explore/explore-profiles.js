"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explore = exports.exploreProfiles = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
// sort out types by generating them!
const exploreProfiles = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ExploreProfilesDocument,
        variables: {
            request,
        },
    });
    return result.data.exploreProfiles;
};
exports.exploreProfiles = exploreProfiles;
const explore = async () => {
    const result = await (0, exports.exploreProfiles)({
        orderBy: generated_1.ExploreProfilesOrderByType.MostFollowers,
    });
    console.log('explore: result', result);
    return result;
};
exports.explore = explore;
(async () => {
    await (0, exports.explore)();
})();
