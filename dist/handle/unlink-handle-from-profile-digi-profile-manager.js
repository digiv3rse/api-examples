"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkHandleFromProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const unlinkHandleFromProfile = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.UnlinkHandleFromProfileDocument,
        variables: {
            request,
        },
    });
    return result.data.unlinkHandleFromProfile;
};
const unlinkHandleFromProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('unlink handle from profile digi profile manager: address', address);
    await (0, login_1.login)(address);
    const result = await unlinkHandleFromProfile({
        handle: 'test/wagmi',
    });
    console.log('unlink handle from profile digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unlinkHandleFromProfile');
};
exports.unlinkHandleFromProfileManager = unlinkHandleFromProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.unlinkHandleFromProfileManager)();
    }
})();
