"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
// This does not work correctly due to resolver returning unexpected data back
(async function () {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('legacy collect: address', address);
    await (0, login_1.login)(address);
    const res = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateLegacyCollectTypedDataDocument,
        variables: {
            request: {
                on: '0x01-0x01',
            },
        },
    });
    console.log('create legacy collect typed data result', res);
    const legacyCollectRes = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.LegacyCollectDocument,
        variables: {
            request: {
                on: '0x01-0x01',
            },
        },
    });
    console.log('legacy collect result', legacyCollectRes);
})();
