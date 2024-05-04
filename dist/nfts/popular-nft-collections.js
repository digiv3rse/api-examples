"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularNftCollections = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getPopularNftCollections = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PopularNftCollectionsDocument,
        variables: {
            request,
        },
    });
    return result.data.popularNftCollections;
};
const popularNftCollections = async () => {
    const popularNftCollections = await getPopularNftCollections({
        onlyVerified: true,
        orderBy: generated_1.PopularNftCollectionsOrder.TotalDiGiProfileOwners,
    });
    console.log(`popular nft collections: ${JSON.stringify(popularNftCollections)}`);
    return popularNftCollections;
};
exports.popularNftCollections = popularNftCollections;
(async () => {
    await (0, exports.popularNftCollections)();
})();
