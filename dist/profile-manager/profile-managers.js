"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const getProfilesManagers = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfileManagersDocument,
        variables: {
            request: {
                for: config_1.PROFILE_ID,
            },
        },
    });
    return result.data.profileManagers;
};
const profilesManagers = async () => {
    const result = await getProfilesManagers();
    console.log(`profiles managed: result`, result);
    return result;
};
(async function () {
    await profilesManagers();
})();
