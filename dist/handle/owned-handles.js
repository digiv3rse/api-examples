"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getOwnedHandles = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.OwnedHandlesDocument,
        variables: {
            request: {
                for: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
            },
        },
    });
    return result.data.ownedHandles;
};
const ownedHandles = async () => {
    const ownedHandles = await getOwnedHandles();
    console.log('owned handles: result', ownedHandles);
    return ownedHandles;
};
(async function () {
    await ownedHandles();
})();
