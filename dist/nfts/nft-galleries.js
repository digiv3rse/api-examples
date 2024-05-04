"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftGalleries = void 0;
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const getNftGalleries = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.NftGalleriesDocument,
        variables: {
            request,
        },
    });
    return result.data.nftGalleries;
};
const nftGalleries = async () => {
    const nftGalleries = await getNftGalleries({
        for: config_1.PROFILE_ID,
    });
    console.log(`nft galleries: ${nftGalleries.items}`);
    return nftGalleries;
};
exports.nftGalleries = nftGalleries;
(async () => {
    await (0, exports.nftGalleries)();
})();
