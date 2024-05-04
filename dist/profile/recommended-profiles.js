"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendedProfiles = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getRecommendedProfilesRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfileRecommendationsDocument,
        variables: {
            request,
        },
    });
    return result.data.profileRecommendations;
};
const recommendedProfiles = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('recommended profiles: address', address);
    await (0, login_1.login)(address);
    // only showing one example to query but you can see from request
    // above you can query many
    const result = await getRecommendedProfilesRequest({
        for: config_1.PROFILE_ID,
    });
    console.log('recommended profiles: result', result);
    return result;
};
exports.recommendedProfiles = recommendedProfiles;
(async () => {
    await (0, exports.recommendedProfiles)();
})();
