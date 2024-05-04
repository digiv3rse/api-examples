"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profiles = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getProfilesRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfilesDocument,
        variables: {
            request,
        },
    });
    return result.data.profiles;
};
const profiles = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('profiles: address', address);
    await (0, login_1.login)(address);
    const profileIds = [config_1.PROFILE_ID]; // Ensure you follow this profileID
    // only showing one example to query but you can see from request
    // above you can query many
    const profilesFromProfileIds = await getProfilesRequest({
        where: {
            profileIds,
        },
    });
    console.log('profiles: result', profilesFromProfileIds);
    return profilesFromProfileIds;
};
exports.profiles = profiles;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.profiles)();
    }
})();
