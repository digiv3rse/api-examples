"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveModule = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getModuleApprovalData = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.GenerateModuleCurrencyApprovalDataDocument,
        variables: {
            request,
        },
    });
    return result.data.generateModuleCurrencyApprovalData;
};
const approveModule = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('approve module: address', address);
    await (0, login_1.login)(address);
    const generateModuleCurrencyApprovalData = await getModuleApprovalData({
        allowance: {
            currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
            value: '1000',
        },
        module: {
            openActionModule: generated_1.OpenActionModuleType.SimpleCollectOpenActionModule,
        },
    });
    console.log('approve module: result', generateModuleCurrencyApprovalData);
    const tx = await (0, ethers_service_1.sendTx)({
        to: generateModuleCurrencyApprovalData.to,
        from: generateModuleCurrencyApprovalData.from,
        data: generateModuleCurrencyApprovalData.data,
    });
    console.log('approve module: txHash', tx.hash);
    await tx.wait();
    console.log('approve module: txHash mined', tx.hash);
};
exports.approveModule = approveModule;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.approveModule)();
    }
})();
