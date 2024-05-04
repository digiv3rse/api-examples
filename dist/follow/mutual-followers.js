"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutualFollowers = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const mutualFollowersRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.MutualFollowersDocument,
        variables: {
            request,
        },
    });
    return result.data.mutualFollowers;
};
const mutualFollowers = async () => {
    const result = await mutualFollowersRequest({
        observer: config_1.PROFILE_ID,
        viewing: known_common_input_constants_1.knownProfileId,
    });
    console.log('mutualFollowers: result', result);
    return result;
};
exports.mutualFollowers = mutualFollowers;
(async () => {
    await (0, exports.mutualFollowers)();
})();
