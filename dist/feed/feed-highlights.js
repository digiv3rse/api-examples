"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedHighlights = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const getFeedHighlights = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.FeedHighlightsDocument,
        variables: {
            request,
        },
    });
    return result.data.feedHighlights;
};
const feedHighlights = async () => {
    const feedHighlights = await getFeedHighlights({
        where: {
            for: config_1.PROFILE_ID || '0x01',
        },
    });
    console.log(`feed highlights: ${feedHighlights.items}`);
    return feedHighlights;
};
exports.feedHighlights = feedHighlights;
(async () => {
    await (0, exports.feedHighlights)();
})();
