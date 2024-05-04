"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFollowModule = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const follow_module_options_1 = require("./helpers/follow-module-options");
const createSetFollowModuleTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateSetFollowModuleTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createSetFollowModuleTypedData;
};
const setFollowModule = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('set follow module: address', address);
    await (0, login_1.login)(address);
    // hard coded to make the code example clear
    const setFollowModuleRequest = {
        // you can play around with follow modules here
        // all request objects are in `follow-module-options.ts`
        followModule: follow_module_options_1.freeFollowModule,
    };
    const { id, typedData } = await createSetFollowModuleTypedData(setFollowModuleRequest);
    console.log('set follow module: result', { id, typedData });
    console.log('set follow module: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('set follow module: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'unfollow');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.setFollowModuleWithSig(typedData.value.profileId, typedData.value.followModule, typedData.value.followModuleInitData, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('set follow module: tx hash', tx.hash);
        return tx.hash;
    }
};
exports.setFollowModule = setFollowModule;
(async () => {
    await (0, exports.setFollowModule)();
})();
