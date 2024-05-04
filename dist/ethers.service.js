"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signText = exports.sendTx = exports.splitSignature = exports.signedTypeData = exports.getAddressFromSigner = exports.getSigner = exports.ethersProvider = void 0;
const ethers_1 = require("ethers");
const config_1 = require("./config");
const helpers_1 = require("./helpers");
exports.ethersProvider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.RPC_URL);
const getSigner = () => {
    return new ethers_1.Wallet(config_1.PK, exports.ethersProvider);
};
exports.getSigner = getSigner;
const getAddressFromSigner = () => {
    return (0, exports.getSigner)().address;
};
exports.getAddressFromSigner = getAddressFromSigner;
const signedTypeData = async (domain, types, value) => {
    const signer = (0, exports.getSigner)();
    // remove the __typedname from the signature!
    const result = await signer._signTypedData((0, helpers_1.omit)(domain, '__typename'), (0, helpers_1.omit)(types, '__typename'), (0, helpers_1.omit)(value, '__typename'));
    // console.log('typed data - domain', omit(domain, '__typename'));
    // console.log('typed data - types', omit(types, '__typename'));
    // console.log('typed data - value', omit(value, '__typename'));
    // console.log('typed data - signature', result);
    // const whoSigned = utils.verifyTypedData(
    //   omit(domain, '__typename'),
    //   omit(types, '__typename'),
    //   omit(value, '__typename'),
    //   result
    // );
    // console.log('who signed', whoSigned);
    return result;
};
exports.signedTypeData = signedTypeData;
const splitSignature = (signature) => {
    return ethers_1.utils.splitSignature(signature);
};
exports.splitSignature = splitSignature;
const sendTx = (transaction) => {
    const signer = (0, exports.getSigner)();
    return signer.sendTransaction(transaction);
};
exports.sendTx = sendTx;
const signText = (text) => {
    return (0, exports.getSigner)().signMessage(text);
};
exports.signText = signText;
