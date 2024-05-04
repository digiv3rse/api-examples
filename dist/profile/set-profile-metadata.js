"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnchainSetProfileMetadataTypedData = void 0;
const uuid_1 = require("uuid");
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const shared_broadcast_1 = require("../broadcast/shared-broadcast");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const digi_hub_1 = require("../digi-hub");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const createOnchainSetProfileMetadataTypedData = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.CreateOnchainSetProfileMetadataTypedDataDocument,
        variables: {
            request,
        },
    });
    return result.data.createOnchainSetProfileMetadataTypedData;
};
exports.createOnchainSetProfileMetadataTypedData = createOnchainSetProfileMetadataTypedData;
const setProfileMetadata = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('set profile metadata: address', address);
    await (0, login_1.login)(address);
    const ipfsResult = await (0, ipfs_1.uploadIpfs)({
        name: 'API examples',
        bio: 'API examples bio',
        cover_picture: 'https://pbs.twimg.com/profile_banners/1478109975406858245/1645016027/1500x500',
        attributes: [
            {
                traitType: 'string',
                value: 'yes this is custom',
                key: 'custom_field',
            },
        ],
        version: '1.0.0',
        metadata_id: (0, uuid_1.v4)(),
    });
    console.log('set profile metadata: ipfs result', ipfsResult);
    const request = {
        metadataURI: `ipfs://${ipfsResult.path}`,
    };
    const { id, typedData } = await (0, exports.createOnchainSetProfileMetadataTypedData)(request);
    console.log('set profile metadata: result', { id, typedData });
    console.log('set profile metadata: typedData', typedData);
    const signature = await (0, ethers_service_1.signedTypeData)(typedData.domain, typedData.types, typedData.value);
    console.log('set profile metadata: signature', signature);
    if (config_1.USE_GASLESS) {
        const broadcastResult = await (0, shared_broadcast_1.broadcastOnchainRequest)({ id, signature });
        await (0, wait_until_complete_1.waitUntilBroadcastTransactionIsComplete)(broadcastResult, 'set profile metadata');
    }
    else {
        const { v, r, s } = (0, ethers_service_1.splitSignature)(signature);
        const tx = await digi_hub_1.digiHub.setProfileMetadataURIWithSig(profileId, request.metadataURI, {
            signer: address,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        });
        console.log('set profile metadata: tx hash', tx.hash);
    }
};
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await setProfileMetadata();
    }
})();
