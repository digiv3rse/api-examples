"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultProfileRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const setDefaultProfileRequest = async (defaultProfileId) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.SetDefaultProfileDocument,
        variables: {
            request: {
                defaultProfileId,
            },
        },
    });
    return result.data.setDefaultProfile;
};
exports.setDefaultProfileRequest = setDefaultProfileRequest;
const setDefaultProfile = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('set default profile: address', address);
    await (0, login_1.login)(address);
    await (0, exports.setDefaultProfileRequest)(profileId);
    console.log('set default profile: success');
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await setDefaultProfile();
    }
})();
