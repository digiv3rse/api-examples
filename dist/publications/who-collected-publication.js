"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoCollected = exports.whoCollectedRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const whoCollectedRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.WhoActedOnPublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.whoActedOnPublication;
};
exports.whoCollectedRequest = whoCollectedRequest;
const whoCollected = async () => {
    const result = await (0, exports.whoCollectedRequest)({
        on: known_common_input_constants_1.knownPostId,
        where: {
            anyOf: [
                {
                    category: generated_1.OpenActionCategoryType.Collect,
                },
            ],
        },
    });
    console.log('who collected: result', result);
    return result;
};
exports.whoCollected = whoCollected;
(async () => {
    await (0, exports.whoCollected)();
})();
