"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getSupportedFollowModules = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.SupportedFollowModulesDocument,
        variables: {
            request: {},
        },
    });
    return result.data.supportedFollowModules;
};
// This currently does not work due to postgres syntax error
const supportedFollowModules = async () => {
    const result = await getSupportedFollowModules();
    console.log('supported follow modules:', result);
    return result;
};
(async function () {
    await supportedFollowModules();
})();
