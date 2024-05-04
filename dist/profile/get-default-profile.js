"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProfile = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getDefaultProfileRequest = async (address) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.GetDefaultProfileDocument,
        variables: {
            request: {
                for: address,
            },
        },
    });
    return result.data.defaultProfile;
};
const defaultProfile = async (ownerAddress) => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = ownerAddress || (0, ethers_service_1.getAddressFromSigner)();
    console.log('get default profile: address', address);
    await (0, login_1.login)(address);
    const defaultProfile = await getDefaultProfileRequest(address);
    console.log('get default profile: result', defaultProfile);
    return defaultProfile;
};
exports.defaultProfile = defaultProfile;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.defaultProfile)();
    }
})();
