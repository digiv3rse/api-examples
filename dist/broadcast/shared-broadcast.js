"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastOnMomokaRequest = exports.broadcastOnchainRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const broadcastOnchainRequest = async (request) => {
    console.log('using gasless broadcast..');
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.BroadcastOnchainDocument,
        variables: {
            request,
        },
    });
    return result.data.broadcastOnchain;
};
exports.broadcastOnchainRequest = broadcastOnchainRequest;
const broadcastOnMomokaRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.BroadcastOnMomokaDocument,
        variables: {
            request,
        },
    });
    return result.data.broadcastOnMomoka;
};
exports.broadcastOnMomokaRequest = broadcastOnMomokaRequest;
