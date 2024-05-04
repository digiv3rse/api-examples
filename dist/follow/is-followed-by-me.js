"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesFollow = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const isFollowedByMe = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.IsFollowedByMeDocument,
        variables: {
            request,
        },
    });
    return result.data.profile;
};
const doesFollow = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('profiles: address', address);
    await (0, login_1.login)(address);
    const result = await isFollowedByMe({
        forProfileId: known_common_input_constants_1.knownProfileId,
    });
    console.log('does follow: result', result);
    return result;
};
exports.doesFollow = doesFollow;
(async () => {
    await (0, exports.doesFollow)();
})();
