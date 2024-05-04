"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftCollections = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const getNftCollections = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.NftCollectionsDocument,
        variables: {
            request,
        },
    });
    return result.data.nftCollections;
};
const nftCollections = async () => {
    const nftCollections = await getNftCollections({
        forAddress: '0x54be3a794282c030b15e43ae2bb182e14c409c5e',
    });
    console.log(`nft collections: ${nftCollections}`);
    return nftCollections;
};
exports.nftCollections = nftCollections;
(async () => {
    await (0, exports.nftCollections)();
})();
