"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const apollo_client_1 = require("../apollo-client");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const login_1 = require("./login");
const refreshAuth = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.RefreshDocument,
        variables: {
            request,
        },
    });
    return result.data.refresh;
};
const refresh = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('refresh: address', address);
    const authenticationResult = await (0, login_1.login)(address);
    const refreshResult = await refreshAuth({
        refreshToken: authenticationResult.refreshToken,
    });
    console.log('refresh: result', refreshResult);
    return refreshResult;
};
exports.refresh = refresh;
(async () => {
    await (0, exports.refresh)();
})();
