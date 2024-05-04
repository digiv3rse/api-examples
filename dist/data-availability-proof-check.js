"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProofs = void 0;
const data_availability_verifier_1 = require("@digiv3rse/data-availability-verifier");
const config_1 = require("./config");
const ethereumNode = {
    environment: data_availability_verifier_1.Environment.SEPOLIA,
    nodeUrl: config_1.RPC_URL,
};
const checkProofs = async (proofId) => {
    const result = await (0, data_availability_verifier_1.checkDAProof)(proofId, ethereumNode);
    if (result.isSuccess()) {
        console.log('proof valid', result.successResult);
        return true;
    }
    // it failed!
    console.error('proof invalid do something', result.failure);
    return false;
};
exports.checkProofs = checkProofs;
