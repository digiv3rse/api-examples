"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const helpers_1 = require("../helpers");
(async function () {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.MomokaTransactionsDocument,
        variables: { request: {} },
    });
    (0, helpers_1.prettyJSON)(`momoka transactions: result: `, result.data.momokaTransactions.items);
})();
