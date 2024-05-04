"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const userSigNoncesRequest = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.UserSigNoncesDocument,
        fetchPolicy: 'network-only',
    });
    return result.data.userSigNonces;
};
const userSigNonces = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('userSigNonces: address', address);
    await (0, login_1.login)(address);
    const result = await userSigNoncesRequest();
    console.log('userSigNonces result:', result);
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await userSigNonces();
    }
})();
