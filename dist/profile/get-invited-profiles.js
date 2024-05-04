"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getInvitedProfiles = async () => {
    const res = await apollo_client_1.apolloClient.query({
        query: generated_1.GetInvitedProfilesDocument,
    });
    return res.data.invitedProfiles;
};
const invitedProfiles = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('add bookmark: address', address);
    await (0, login_1.login)(address);
    const invitedProfiles = await getInvitedProfiles();
    console.log('invitedProfiles: profiles', invitedProfiles);
};
(async function () {
    await invitedProfiles();
})();
