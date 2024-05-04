"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProfileMetadataDiGiProfileManager = void 0;
const uuid_1 = require("uuid");
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const ipfs_1 = require("../ipfs");
const wait_until_complete_1 = require("../transaction/wait-until-complete");
const setProfileMetadata = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.SetProfileMetadataDocument,
        variables: {
            request,
        },
    });
    return result.data.setProfileMetadata;
};
const setProfileMetadataDiGiProfileManager = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('set profile metadata digi profile manager: address', address);
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
    console.log('set profile metadata digi profile manager: ipfs result', ipfsResult);
    const request = {
        metadataURI: `ipfs://${ipfsResult.path}`,
    };
    const result = await setProfileMetadata(request);
    console.log('set profile metadata digi profile manager: result', result);
    await (0, wait_until_complete_1.waitUntilDiGiManagerTransactionIsComplete)(result, 'setProfileMetadata');
};
exports.setProfileMetadataDiGiProfileManager = setProfileMetadataDiGiProfileManager;
(async () => {
    if ((0, config_1.explicitStart)(__filename)) {
        await (0, exports.setProfileMetadataDiGiProfileManager)();
    }
})();
