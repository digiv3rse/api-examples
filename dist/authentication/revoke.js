"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revoke = void 0;
const apollo_client_1 = require("../apollo-client");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const jsonwebtoken_1 = require("jsonwebtoken");
const login_1 = require("./login");
const revokeAuth = async (authorizationId) => {
    await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.RevokeAuthenticationDocument,
        variables: {
            authorizationId,
        },
    });
};
const revoke = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('refresh: address', address);
    const authenticationResult = await (0, login_1.login)(address);
    const payload = (0, jsonwebtoken_1.decode)(authenticationResult?.accessToken);
    if (typeof payload === 'string' || !payload) {
        throw new Error('Invalid payload');
    }
    const authorizationId = payload.authorizationId;
    console.log('session: authorizationId', authorizationId);
    await revokeAuth(authorizationId);
};
exports.revoke = revoke;
(async () => {
    await (0, exports.revoke)();
})();
