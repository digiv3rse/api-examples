"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const ethers_1 = require("ethers");
const apollo_client_1 = require("../apollo-client");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const has_transaction_been_indexed_1 = require("../indexer/has-transaction-been-indexed");
const createProfileWithHandleRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateProfileWithHandleDocument,
        variables: {
            request,
        },
    });
    return result.data.createProfileWithHandle;
};
const createProfile = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('create profile with handle: address', address);
    const result = await createProfileWithHandleRequest({
        handle: new Date().getTime().toString(),
        to: address,
    });
    console.log('create profile with handle: result', result);
    if (result.__typename !== 'RelaySuccess') {
        console.error(`${result}: failed`, result);
        throw new Error(`${result}: failed`);
    }
    console.log(`${result}: poll until indexed`);
    const indexedResult = await (0, has_transaction_been_indexed_1.waitUntilComplete)({ forTxId: result.txId });
    console.log(`${result}: has been indexed`, indexedResult);
    console.log(`${result}: complete`);
    console.log('create profile: profile has been indexed', result);
    const txReceipt = await ethers_service_1.ethersProvider.getTransactionReceipt(result.txHash);
    const logs = txReceipt.logs;
    console.log('create profile: logs', logs);
    const topicId = ethers_1.utils.id('ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)');
    console.log('created profile: topicid we care about', topicId);
    const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
    console.log('created profile: profile created log', profileCreatedLog);
    let profileCreatedEventLog = profileCreatedLog.topics;
    console.log('created profile: profile created event logs', profileCreatedEventLog);
    const profileId = ethers_1.utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0];
    console.log('created profile: profile id', ethers_1.BigNumber.from(profileId).toHexString());
};
exports.createProfile = createProfile;
(async () => {
    await (0, exports.createProfile)();
})();
