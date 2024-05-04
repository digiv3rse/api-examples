"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explore = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const explorePublications = (request) => {
    return apollo_client_1.apolloClient.query({
        query: generated_1.ExplorePublicationsDocument,
        variables: {
            request,
        },
    });
};
const explore = async () => {
    const result = await explorePublications({
        orderBy: generated_1.ExplorePublicationsOrderByType.Latest,
    });
    console.log('explore: result', result.data);
    return result.data;
};
exports.explore = explore;
(async () => {
    await (0, exports.explore)();
})();
