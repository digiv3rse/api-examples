"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const newPublicationStatsSubscription = (publicationId) => {
    apollo_client_1.apolloClient
        .subscribe({
        query: generated_1.NewPublicationStatsDocument,
        variables: {
            for: publicationId,
        },
    })
        .subscribe({
        next(value) {
            console.log('newPublicationStatsSubscription:', value);
        },
    });
};
newPublicationStatsSubscription(config_1.POST_ID || known_common_input_constants_1.knownPostId);
