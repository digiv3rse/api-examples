"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const getMutualPoaps = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.MutualPoapsDocument,
        variables: {
            request,
        },
    });
    return result.data.mutualPoaps;
};
const mutualPoaps = async () => {
    const poapEvent = await getMutualPoaps({
        observer: config_1.PROFILE_ID,
        viewing: known_common_input_constants_1.knownProfileId,
    });
    console.log('mutual poaps: result', poapEvent);
    return poapEvent;
};
(async function () {
    await mutualPoaps();
})();
