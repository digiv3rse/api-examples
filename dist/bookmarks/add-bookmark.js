"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBookmark = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const addPublicationProfileBookmark = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.AddPublicationBookmarkDocument,
        variables: {
            request,
        },
    });
    return result.data.addPublicationBookmark;
};
const addBookmark = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('add bookmark: address', address);
    await (0, login_1.login)(address);
    await addPublicationProfileBookmark({
        on: known_common_input_constants_1.knownPostId,
    });
    console.log('add bookmark: success');
};
exports.addBookmark = addBookmark;
(async () => {
    await (0, exports.addBookmark)();
})();
