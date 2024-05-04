"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dismissRecommendedProfiles = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const dismissRecommendedProfilesRequest = async (dismiss) => {
    await apollo_client_1.apolloClient.query({
        query: generated_1.DismissRecommendedProfilesDocument,
        variables: {
            request: {
                dismiss,
            },
        },
    });
};
// Currently errors due to graphql error
const dismissRecommendedProfiles = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    await (0, login_1.login)(address);
    await dismissRecommendedProfilesRequest([known_common_input_constants_1.knownProfileId]);
};
exports.dismissRecommendedProfiles = dismissRecommendedProfiles;
(async () => {
    await (0, exports.dismissRecommendedProfiles)();
})();
