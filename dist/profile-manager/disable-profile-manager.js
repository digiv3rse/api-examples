"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableDiGiProfileManager = exports.createChangeProfileManagersTypedData = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createChangeProfileManagersTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateChangeProfileManagersTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createChangeProfileManagersTypedData;
};
exports.createChangeProfileManagersTypedData = createChangeProfileManagersTypedData;
const disableDiGiProfileManager = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('change profile manager: address', address);
    await (0, login_1.login)(address);
    const { id, typedData } = await (0, exports.createChangeProfileManagersTypedData)({
        approveSignless: false,
        // leave it blank if you want to use the digi API manager!
        // changeManagers: [
        //   {
        //     action: ChangeProfileManagerActionType.Add,
        //     address: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
        //   },
        // ],
    });
    console.log('change profile manager:', { id, typedData });
    console.log('change profile manager: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('change profile manager: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'change profile manager');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.changeDelegatedExecutorsConfigWithSig(typedData.value.delegatorProfileId, typedData.value.delegatedExecutors, typedData.value.approvals, typedData.value.configNumber, typedData.value.switchToGivenConfig, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('change profile manager: tx hash', tx.hash);
    }
};
exports.disableDiGiProfileManager = disableDiGiProfileManager;
(async () => {
    await (0, exports.disableDiGiProfileManager)();
})();
