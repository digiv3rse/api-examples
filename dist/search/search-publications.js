"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const searchRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.SearchPublicationsDocument,
        variables: {
            request,
        },
    });
    return result.data.searchPublications;
};
const search = async () => {
    const result = await searchRequest({
        query: 'content',
        // TODO: Fix to where being not required
        where: {},
    });
    console.log('search publications: result', result);
    return result;
};
exports.search = search;
(async () => {
    await (0, exports.search)();
})();
