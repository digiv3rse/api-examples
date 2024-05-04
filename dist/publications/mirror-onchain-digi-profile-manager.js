"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MirrorOnChainDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const mirrorOnChain = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.MirrorOnchainDocument,
        variables: {
            request,
        },
    });
    return result.data.mirrorOnchain;
};
const MirrorOnChainDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('mirror onchain digi profile manager: address', address);
    await (0, login_1.login)(address);
    // TODO! in docs make sure we talk about onchain referrals
    const request = {
        mirrorOn: known_common_input_constants_1.knownPostId,
    };
    const result = await mirrorOnChain(request);
    console.log('mirror onchain digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'unblock');
};
exports.MirrorOnChainDiGiProfileManager = MirrorOnChainDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.MirrorOnChainDiGiProfileManager)();
    }
})();
