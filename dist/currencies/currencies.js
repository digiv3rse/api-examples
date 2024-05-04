"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencies = exports.getCurrencies = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getCurrencies = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.CurrenciesDocument,
        variables: {
            request: {},
        },
    });
    return result.data.currencies;
};
exports.getCurrencies = getCurrencies;
const currencies = async () => {
    const result = await (0, exports.getCurrencies)();
    console.log('currencies: result', result);
    return result;
};
exports.currencies = currencies;
(async () => {
    await (0, exports.currencies)();
})();
