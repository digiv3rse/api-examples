"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadIpfsGetPath = exports.uploadIpfs = void 0;
const ipfs_http_client_1 = require("ipfs-http-client");
const config_1 = require("./config");
const projectId = config_1.INFURA_PROJECT_ID;
const secret = config_1.INFURA_SECRET;
if (!projectId || !secret) {
    throw new Error('Must define INFURA_PROJECT_ID and INFURA_SECRET in the .env to run this');
}
const client = (0, ipfs_http_client_1.create)({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: `Basic ${Buffer.from(`${projectId}:${secret}`, 'utf-8').toString('base64')}`,
    },
});
const uploadIpfs = async (data) => {
    const result = await client.add(JSON.stringify(data));
    console.log('upload result ipfs', result);
    return result;
};
exports.uploadIpfs = uploadIpfs;
const uploadIpfsGetPath = async (data) => {
    const result = await client.add(JSON.stringify(data));
    console.log('upload result ipfs', result);
    return result.path;
};
exports.uploadIpfsGetPath = uploadIpfsGetPath;
