"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilDiGiManagerTransactionIsComplete = exports.waitUntilBroadcastTransactionIsComplete = void 0;
const has_transaction_been_indexed_1 = require("../indexer/has-transaction-been-indexed");
async function waitUntilBroadcastTransactionIsComplete(broadcastResult, broadcastName // for logging e.g. 'create post'
) {
    const actionToBroadcast = broadcastName ?? 'broadcast';
    console.log(actionToBroadcast, { broadcastResult });
    if (broadcastResult.__typename !== 'RelaySuccess') {
        console.error(`${actionToBroadcast}: failed`, broadcastResult);
        throw new Error(`${actionToBroadcast}: failed`);
    }
    console.log(`${actionToBroadcast}: poll until indexed`);
    const indexedResult = await (0, has_transaction_been_indexed_1.waitUntilComplete)({ forTxId: broadcastResult.txId });
    console.log(`${actionToBroadcast}: has been indexed`, indexedResult);
    console.log(`${actionToBroadcast}: complete`);
}
exports.waitUntilBroadcastTransactionIsComplete = waitUntilBroadcastTransactionIsComplete;
async function waitUntilDiGiManagerTransactionIsComplete(result, name) {
    console.log('digi profile manager with action - ', { name });
    if (result.__typename !== 'RelaySuccess') {
        console.error(`${result}: failed`, result);
        throw new Error(`${result}: failed`);
    }
    console.log(`${result}: poll until indexed`);
    const indexedResult = await (0, has_transaction_been_indexed_1.waitUntilComplete)({ forTxId: result.txId });
    console.log(`${result}: has been indexed`, indexedResult);
    console.log(`${result}: complete`);
}
exports.waitUntilDiGiManagerTransactionIsComplete = waitUntilDiGiManagerTransactionIsComplete;
