"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftCollectionOwners = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getNftCollectionOwners = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.NftCollectionOwnersDocument,
        variables: {
            request,
        },
    });
    return result.data.nftCollectionOwners;
};
// Currently not working with sql error: syntax error at or near \"(\
const nftCollectionOwners = async () => {
    const nftCollectionOwners = await getNftCollectionOwners({
        for: '0x54be3a794282c030b15e43ae2bb182e14c409c5e',
        chainId: 80001,
    });
    console.log(`nft collection owners: ${nftCollectionOwners}`);
    return nftCollectionOwners;
};
exports.nftCollectionOwners = nftCollectionOwners;
(async () => {
    await (0, exports.nftCollectionOwners)();
})();
