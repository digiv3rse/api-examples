"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileActionHistory = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getProfileActionHistory = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfileActionHistoryDocument,
        variables: {
            request: {},
        },
    });
    return result.data.profileActionHistory;
};
const profileActionHistory = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('add bookmark: address', address);
    await (0, login_1.login)(address);
    const profileActionHistory = await getProfileActionHistory();
    console.log(`profile action history: ${profileActionHistory}`);
    return profileActionHistory;
};
exports.profileActionHistory = profileActionHistory;
(async () => {
    await (0, exports.profileActionHistory)();
})();
