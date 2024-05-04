"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutualNftCollections = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const getMutualNftCollections = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.MutualNftCollectionsDocument,
        variables: {
            request,
        },
    });
    return result.data.mutualNftCollections;
};
const mutualNftCollections = async () => {
    const mutualNftCollections = await getMutualNftCollections({
        viewing: known_common_input_constants_1.knownProfileId,
        observer: config_1.PROFILE_ID,
    });
    console.log(`mutual nft collections: ${JSON.stringify(mutualNftCollections)}`);
    return mutualNftCollections;
};
exports.mutualNftCollections = mutualNftCollections;
(async () => {
    await (0, exports.mutualNftCollections)();
})();
