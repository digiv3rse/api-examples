"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const removeReactionRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.RemoveReactionDocument,
        variables: {
            request,
        },
    });
    return result.data.removeReaction;
};
const removeReaction = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('remove reaction: address', address);
    await (0, login_1.login)(address);
    await removeReactionRequest({
        reaction: generated_1.PublicationReactionType.Upvote,
        for: config_1.POST_ID || known_common_input_constants_1.knownPostId,
    });
    console.log('remove reaction: success');
};
exports.removeReaction = removeReaction;
(async () => {
    await (0, exports.removeReaction)();
})();
