"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimableStatus = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getClaimableStatusRequest = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.ClaimableStatusDocument,
        variables: {},
    });
    return result.data.claimableStatus;
};
const claimableStatus = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('profiles: address', address);
    await (0, login_1.login)(address);
    const status = await getClaimableStatusRequest();
    console.log('claimable profiles: result', status);
    return status;
};
exports.claimableStatus = claimableStatus;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.claimableStatus)();
    }
})();
