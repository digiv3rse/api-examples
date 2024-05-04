"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followDiGiProfileManager = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const follow = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.FollowDocument,
        variables: {
            request,
        },
    });
    return result.data.follow;
};
const followDiGiProfileManager = async (profileId = known_common_input_constants_1.knownProfileId) => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('follow digi profile manager: address', address);
    await (0, login_1.login)(address);
    const result = await follow({
        follow: [
            {
                profileId: profileId,
            },
        ],
    });
    console.log('follow digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'follow');
};
exports.followDiGiProfileManager = followDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.followDiGiProfileManager)();
    }
})();
