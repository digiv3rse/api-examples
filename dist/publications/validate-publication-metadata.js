"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const publication_metadata_mocks_1 = require("./helpers/publication-metadata-mocks");
(async function () {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ValidatePublicationMetadataDocument,
        variables: {
            request: {
                json: JSON.stringify(publication_metadata_mocks_1.publicationMetadataTextOnly),
            },
        },
    });
    console.log(`validate publication metadata result: ${result.data.validatePublicationMetadata}`);
})();
