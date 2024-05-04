"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const follow_1 = require("../follow/follow");
const has_transaction_been_indexed_1 = require("../indexer/has-transaction-been-indexed");
const known_common_input_constants_1 = require("../known-common-input-constants");
const shared_broadcast_1 = require("./shared-broadcast");
const broadcast = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('follow with broadcast: address', address);
    await (0, login_1.login)(address);
    const result = await (0, follow_1.createFollowTypedData)({
        follow: [
            {
                profileId: known_common_input_constants_1.knownProfileId,
            },
        ],
    });
    console.log('follow with broadcast: result', result);
    const typedData = result.typedData;
    console.log('follow with broadcast: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('follow with broadcast: signature', signature);
    const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({
        id: result.id,
        signature,
    });
    console.log('follow with broadcast: broadcastResult', broadcastResult);
    if (broadcastResult.__typename !== 'RelaySuccess') {
        console.error('follow with broadcast: failed', broadcastResult);
        throw new Error('follow with broadcast: failed');
    }
    console.log('follow with broadcast: poll until indexed');
    const indexedResult = await (0, has_transaction_been_indexed_1.waitUntilComplete)({ forTxId: broadcastResult.txId });
    console.log('follow with broadcast: has been indexed', indexedResult);
    console.log('follow broadcast: complete');
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await broadcast();
    }
})();
