"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getSupportedOpenActionCollectModules = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.SupportedOpenActionCollectModulesDocument,
        variables: {
            request: {},
        },
    });
    return result.data.supportedOpenActionCollectModules;
};
// This currently does not work due to postgres syntax error
const supportedOpenActionCollectModules = async () => {
    const result = await getSupportedOpenActionCollectModules();
    console.log('supported open action collect modules', result);
    return result;
};
(async function () {
    await supportedOpenActionCollectModules();
})();
