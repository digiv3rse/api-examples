"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkHandleToProfileProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const linkHandleToProfile = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.LinkHandleToProfileDocument,
        variables: {
            request,
        },
    });
    return result.data.linkHandleToProfile;
};
const linkHandleToProfileProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('link handle to profile: digi profile manager: address', address);
    await (0, login_1.login)(address);
    const result = await linkHandleToProfile({
        handle: 'test/wagmi',
    });
    console.log('link handle to profile: digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unlinkHandleFromProfile');
};
exports.linkHandleToProfileProfileManager = linkHandleToProfileProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.linkHandleToProfileProfileManager)();
    }
})();
