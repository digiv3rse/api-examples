"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followers = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const followersRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.FollowersDocument,
        variables: {
            request,
        },
    });
    return result.data.followers;
};
const followers = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const result = await followersRequest({ of: profileId });
    console.log('followers: result', result);
    return result;
};
exports.followers = followers;
(async () => {
    await (0, exports.followers)();
})();
