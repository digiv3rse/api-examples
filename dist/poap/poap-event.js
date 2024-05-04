"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getPoapEvent = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PoapEventDocument,
        variables: {
            request,
        },
    });
    return result.data.poapEvent;
};
const poapEvent = async () => {
    const poapEvent = await getPoapEvent({
        eventId: '412',
    });
    console.log('poap event: result', poapEvent);
    return poapEvent;
};
(async function () {
    await poapEvent();
})();
