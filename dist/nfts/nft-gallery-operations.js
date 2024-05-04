"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const createNftGallery = async () => {
    const res = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateNftGalleryDocument,
        variables: {
            request: {
                name: 'Test test',
                items: [
                    {
                        tokenId: '1',
                        contract: {
                            address: '0x54be3a794282c030b15e43ae2bb182e14c409c5e',
                            chainId: 80001,
                        },
                    },
                ],
            },
        },
    });
    return res.data?.createNftGallery;
};
const updateNftGalleryInfo = async (nftGalleryId, name) => {
    await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.UpdateNftGalleryInfoDocument,
        variables: {
            request: {
                name,
                galleryId: nftGalleryId,
            },
        },
    });
};
const deleteNftGallery = async (nftGalleryId) => {
    await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.DeleteNftGalleryDocument,
        variables: {
            request: {
                galleryId: nftGalleryId,
            },
        },
    });
};
const nftGalleryOperations = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('nft gallery operations: address', address);
    if (!config_1.PROFILE_ID) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    await (0, login_1.login)(address);
    const nftGalleryId = await createNftGallery();
    await updateNftGalleryInfo(nftGalleryId, 'Test test 2');
    await deleteNftGallery(nftGalleryId);
};
(async function () {
    await nftGalleryOperations();
})();
