"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoActedOnPublication = exports.getWhoActedOnPublication = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const getWhoActedOnPublication = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.WhoActedOnPublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.whoActedOnPublication;
};
exports.getWhoActedOnPublication = getWhoActedOnPublication;
// currently does not work due to postgres syntax error
const whoActedOnPublication = async () => {
    const result = await (0, exports.getWhoActedOnPublication)({ on: known_common_input_constants_1.knownPostId });
    console.log('who acted on publication: result', result);
    return result;
};
exports.whoActedOnPublication = whoActedOnPublication;
(async () => {
    await (0, exports.whoActedOnPublication)();
})();
