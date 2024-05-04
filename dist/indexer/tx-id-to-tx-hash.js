"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const txIdToTxHashRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.TxIdToTxHashDocument,
        variables: request,
        fetchPolicy: 'network-only',
    });
    return result.data.txIdToTxHash;
};
const txIdToTxHash = async () => {
    const result = await txIdToTxHashRequest({
        for: '41e86c8e-6cb0-417f-b359-ae681194394a',
    });
    console.log('txIdToTxHash result:', result);
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await txIdToTxHash();
    }
})();
