"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimableProfiles = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getClaimableProfilesRequest = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ClaimableProfilesDocument,
        variables: {},
    });
    return result.data.claimableProfiles;
};
const claimableProfiles = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('profiles: address', address);
    await (0, login_1.login)(address);
    const claimables = await getClaimableProfilesRequest();
    console.log('claimable profiles: result', claimables);
    return claimables;
};
exports.claimableProfiles = claimableProfiles;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.claimableProfiles)();
    }
})();
