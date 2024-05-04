"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileFeed = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getProfileFeedRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.FeedDocument,
        variables: {
            request,
        },
    });
    return result.data.feed;
};
const profileFeed = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('profile feed: address', address);
    await (0, login_1.login)(address);
    const result = await getProfileFeedRequest({});
    console.log('profile feed: result', JSON.stringify(result, null, 2));
};
exports.profileFeed = profileFeed;
(async () => {
    await (0, exports.profileFeed)();
})();
