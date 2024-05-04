"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getSupportedReferenceModules = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.SupportedReferenceModulesDocument,
    });
    return result.data.supportedReferenceModules;
};
// This currently does not work due to postgres syntax error
const supportedReferenceModules = async () => {
    const result = await getSupportedReferenceModules();
    console.log('supported reference modules', result);
    return result;
};
(async function () {
    await supportedReferenceModules();
})();
