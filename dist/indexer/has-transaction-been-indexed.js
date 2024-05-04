"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilComplete = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const hasTxBeenIndexed = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.DiGiTransactionStatusDocument,
        variables: {
            request,
        },
        fetchPolicy: 'network-only',
    });
    return result.data.digiTransactionStatus;
};
const waitUntilComplete = async (input) => {
    while (true) {
        const response = await hasTxBeenIndexed(input);
        if (!response) {
            break;
        }
        console.log('pool until indexed: result', response);
        switch (response.status) {
            case generated_1.DiGiTransactionStatusType.Failed:
                throw new Error(response.reason ?? 'Transaction failed');
            case generated_1.DiGiTransactionStatusType.Processing:
                console.log('still in progress');
                break;
            case generated_1.DiGiTransactionStatusType.Complete:
                console.log('complete and indexed onchain');
                return response;
        }
        console.log('pool until indexed: sleep for 1500 milliseconds then try again');
        // sleep for before trying again
        await new Promise((resolve) => setTimeout(resolve, 1500));
    }
};
exports.waitUntilComplete = waitUntilComplete;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        //await testTransaction();
    }
})();
