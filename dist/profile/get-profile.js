"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getProfileRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfileDocument,
        variables: {
            request,
        },
    });
    return result.data.profile;
};
const profile = async (request) => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('profiles: address', address);
    await (0, login_1.login)(address);
    if (!request) {
        request = { forProfileId: config_1.PROFILE_ID };
    }
    const profile = await getProfileRequest(request);
    console.log('profile: result', profile);
    return profile;
};
exports.profile = profile;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.profile)();
    }
})();
