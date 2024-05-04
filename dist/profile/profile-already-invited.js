"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileAlreadyInvited = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getProfileAlreadyInvited = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfileAlreadyInvitedDocument,
        variables: {
            request: {
                for: '0x54be3a794282c030b15e43ae2bb182e14c409c5e',
            },
        },
    });
    return result.data.profileAlreadyInvited;
};
const profileAlreadyInvited = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('add bookmark: address', address);
    await (0, login_1.login)(address);
    const profileAlreadyInvited = await getProfileAlreadyInvited();
    console.log(`profile already invited result: ${profileAlreadyInvited}`);
    return profileAlreadyInvited;
};
exports.profileAlreadyInvited = profileAlreadyInvited;
(async () => {
    await (0, exports.profileAlreadyInvited)();
})();
