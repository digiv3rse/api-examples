"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicationsTags = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getPublicationsTagsRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PublicationsTagsDocument,
        variables: {
            request,
        },
    });
    return result.data.publicationsTags;
};
const getPublicationsTags = async () => {
    const result = await getPublicationsTagsRequest({
        where: {
            publishedOn: [],
        },
    });
    console.log('publications tags: result', result);
    return result;
};
exports.getPublicationsTags = getPublicationsTags;
(async () => {
    await (0, exports.getPublicationsTags)();
})();
