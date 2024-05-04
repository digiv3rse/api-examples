"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersNfts = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const getUsersNfts = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.NftsDocument,
        variables: {
            request,
        },
    });
    return result.data.nfts;
};
const usersNfts = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('users nfts: address', address);
    await (0, login_1.login)(address);
    // - If you are using testnet this endpoint will only allow you to query `ethereum kovan (chainId: 42)` and `polygon Mumbai (chainId: 80001)`
    // - If you are using mainnet this endpoint will only allow you to query `ethereum mainnet (chainId: 1)` and `polygon mainnet (chainId: 137)`
    const result = await getUsersNfts({
        where: {
            // forProfileId: PROFILE_ID,
            // query: 'Bored Ape'
            forAddress: '0x54be3a794282c030b15e43ae2bb182e14c409c5e',
            chainIds: [80001],
        },
    });
    console.log('users nfts: result', result);
    return result;
};
exports.usersNfts = usersNfts;
(async () => {
    await (0, exports.usersNfts)();
})();
