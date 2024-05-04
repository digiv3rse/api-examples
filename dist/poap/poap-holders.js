"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getPoapHolders = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PoapHoldersDocument,
        variables: {
            request,
        },
    });
    return result.data.poapHolders;
};
const poapEvent = async () => {
    const poapHolders = await getPoapHolders({
        eventId: 1,
    });
    console.log('poap holders: result', poapHolders);
    return poapHolders;
};
(async function () {
    await poapEvent();
})();
