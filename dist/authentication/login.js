"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.generateChallenge = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const state_1 = require("../state");
const generateChallenge = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ChallengeDocument,
        variables: {
            request,
        },
    });
    return result.data.challenge;
};
exports.generateChallenge = generateChallenge;
const authenticate = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.AuthenticateDocument,
        variables: {
            request,
        },
    });
    return result.data.authenticate;
};
const login = async (address = (0, ethers_service_1.getAddressFromSigner)()) => {
    if ((0, state_1.getAuthenticationToken)()) {
        console.log('login: already logged in');
        return;
    }
    console.log('login: address', address);
    console.log('login: profileId', config_1.PROFILE_ID);
    // we request a challenge from the server
    const challengeResponse = await (0, exports.generateChallenge)({ for: config_1.PROFILE_ID, signedBy: address });
    // sign the text with the wallet
    const signature = await (0, ethers_service_1.signText)(challengeResponse.text);
    const authenticatedResult = await authenticate({ id: challengeResponse.id, signature });
    console.log('login: result', authenticatedResult);
    (0, state_1.setAuthenticationToken)(authenticatedResult.accessToken);
    return authenticatedResult;
};
exports.login = login;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.login)();
    }
})();
