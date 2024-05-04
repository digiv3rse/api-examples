"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
(async function () {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.MomokaSummaryDocument,
    });
    console.log(`total # of momoka transactions: ${result.data.momokaSummary.totalTransactions}`);
})();
