"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublications = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const getPublicationsRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PublicationsDocument,
        variables: {
            request,
        },
    });
    return result.data.publications;
};
const getPublications = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const result = await getPublicationsRequest({
        where: {
            from: [profileId],
        },
        // profileId,
        // publicationTypes: [PublicationTypes.Post, PublicationTypes.Comment, PublicationTypes.Mirror],
    });
    console.log('publications: result', result.items);
    return result;
};
exports.getPublications = getPublications;
(async () => {
    await (0, exports.getPublications)();
})();
