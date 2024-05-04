"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actOnProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const actOn = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.ActOnOpenActionDocument,
        variables: {
            request,
        },
    });
    return result.data.actOnOpenAction;
};
const actOnProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('act on: address', address);
    await (0, login_1.login)(address);
    const result = await actOn({
        for: '0x03-0x4b',
        actOn: {
            simpleCollectOpenAction: true,
        },
    });
    console.log('act on: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unfollow');
};
exports.actOnProfileManager = actOnProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.actOnProfileManager)();
    }
})();
