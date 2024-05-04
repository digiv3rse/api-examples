"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enabledCurrencies = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const enabledCurrenciesRequest = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.EnabledCurrenciesDocument,
    });
    return result.data.currencies;
};
const enabledCurrencies = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('enabled currencies: address', address);
    await (0, login_1.login)(address);
    const result = await enabledCurrenciesRequest();
    console.log('enabled currencies: result', result);
    return result;
};
exports.enabledCurrencies = enabledCurrencies;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.enabledCurrencies)();
    }
})();
