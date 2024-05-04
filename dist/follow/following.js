"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.following = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const followingRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.FollowingDocument,
        variables: {
            request,
        },
    });
    return result.data.following;
};
const following = async () => {
    const profileId = config_1.PROFILE_ID;
    console.log('following: ProfileId', profileId);
    const result = await followingRequest({
        for: profileId,
    });
    console.log('following: result', result);
    return result;
};
exports.following = following;
(async () => {
    await (0, exports.following)();
})();
