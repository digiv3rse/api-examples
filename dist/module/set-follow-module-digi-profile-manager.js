"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFollowModuleDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const follow_module_options_1 = require("./helpers/follow-module-options");
const setFollowModule = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.SetFollowModuleDocument,
        variables: {
            request,
        },
    });
    return result.data.setFollowModule;
};
const setFollowModuleDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('set follow module digi profile manager: address', address);
    await (0, login_1.login)(address);
    // hard coded to make the code example clear
    const setFollowModuleRequest = {
        // you can play around with follow modules here
        // all request objects are in `follow-module-options.ts`
        followModule: follow_module_options_1.freeFollowModule,
    };
    const result = await setFollowModule(setFollowModuleRequest);
    console.log('set follow module digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unfollow');
};
exports.setFollowModuleDiGiProfileManager = setFollowModuleDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.setFollowModuleDiGiProfileManager)();
    }
})();
