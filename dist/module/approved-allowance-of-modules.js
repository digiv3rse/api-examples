"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowance = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const allowanceRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ApprovedModuleAllowanceAmountDocument,
        variables: {
            request,
        },
    });
    return result.data.approvedModuleAllowanceAmount;
};
const allowance = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('allowance: address', address);
    await (0, login_1.login)(address);
    const result = await allowanceRequest({
        currencies: ['0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'],
        openActionModules: [generated_1.OpenActionModuleType.SimpleCollectOpenActionModule],
    });
    console.log('allowance: result', result);
    return result;
};
exports.allowance = allowance;
(async () => {
    await (0, exports.allowance)();
})();
