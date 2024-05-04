"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProfileInterests = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const removeProfileInterestsRequest = async (interests) => {
    await apollo_client_1.apolloClient.query({
        query: generated_1.RemoveProfileInterestsDocument,
        variables: {
            request: {
                interests,
            },
        },
    });
};
// Currently fails due to sql error
const removeProfileInterests = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    await (0, login_1.login)(address);
    await removeProfileInterestsRequest([generated_1.ProfileInterestTypes.ArtEntertainment]);
};
exports.removeProfileInterests = removeProfileInterests;
(async () => {
    await (0, exports.removeProfileInterests)();
})();
