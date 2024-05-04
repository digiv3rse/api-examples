"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getProfilesManaged = async (address) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ProfilesManagedDocument,
        variables: {
            request: {
                for: address,
                includeOwned: true,
            },
        },
    });
    return result.data.profilesManaged;
};
const profilesManaged = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    const result = await getProfilesManaged(address);
    console.log(`profiles managed: result`, result);
    return result;
};
(async function () {
    await profilesManaged();
})();
