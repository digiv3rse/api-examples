"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRequest = void 0;
const apollo_client_1 = require("../apollo-client");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const login_1 = require("./login");
const verify = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.VerifyDocument,
        variables: {
            request,
        },
    });
    return result.data.verify;
};
const verifyRequest = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('verify: address', address);
    const authenticationResult = await (0, login_1.login)(address);
    const result = await verify({ accessToken: authenticationResult.accessToken });
    console.log('verify: result', result);
    return result;
};
exports.verifyRequest = verifyRequest;
(async () => {
    await (0, exports.verifyRequest)();
})();
