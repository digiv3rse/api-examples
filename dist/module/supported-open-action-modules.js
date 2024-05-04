"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getSupportedOpenActionModules = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.SupportedOpenActionModulesDocument,
        variables: {
            request: {},
        },
    });
    return result.data.supportedOpenActionModules;
};
// This currently does not work due to postgres syntax error
const supportedOpenActionModules = async () => {
    const result = await getSupportedOpenActionModules();
    console.log('supported open action modules:', result);
    return result;
};
(async function () {
    await supportedOpenActionModules();
})();
