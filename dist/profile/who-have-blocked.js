"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getWhoHaveBlocked = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.WhoHaveBlockedDocument,
        variables: {
            request: {},
        },
    });
    return result.data.whoHaveBlocked;
};
// currently does not work due to postgres syntax error
const whoHaveBlocked = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    await (0, login_1.login)(address);
    const result = await getWhoHaveBlocked();
    console.log('blocked profiles:', result);
    return result;
};
(async function () {
    await whoHaveBlocked();
})();
