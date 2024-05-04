"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST_ID = exports.ORIGIN = exports.USE_GASLESS = exports.INFURA_SECRET = exports.INFURA_PROJECT_ID = exports.PROFILE_ID = exports.DIGI_TOKEN_HANDLE_REGISTRY_ABI = exports.DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT = exports.DIGI_HUB_CONTRACT = exports.DIGI_HUB_ABI = exports.DIGI_API_WEBSOCKET = exports.DIGI_API = exports.RPC_URL = exports.PK = exports.explicitStart = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileDiGiHub = fs_1.default.readFileSync(path_1.default.join(__dirname, 'abis/digi-hub-contract-abi.json'), 'utf8');
const fileDiGiTokenHandleRegistry = fs_1.default.readFileSync(path_1.default.join(__dirname, 'abis/digi-token-handle-registry-contract-abi.json'), 'utf8');
const getParamOrExit = (name, errorMessage) => {
    const param = process.env[name];
    if (!param) {
        console.error(errorMessage ?? `Required config param '${name}' missing`);
        process.exit(1);
    }
    return param;
};
const getParam = (name) => {
    const param = process.env[name];
    if (!param) {
        return null;
    }
    return param;
};
const explicitStart = (filename) => {
    const scriptName = path_1.default.basename(process.argv[1]);
    return path_1.default.basename(filename).includes(scriptName);
};
exports.explicitStart = explicitStart;
exports.PK = getParamOrExit('PK');
exports.RPC_URL = getParamOrExit('RPC_URL');
exports.DIGI_API = getParamOrExit('DIGI_API');
exports.DIGI_API_WEBSOCKET = getParam('DIGI_API_WEBSOCKET');
exports.DIGI_HUB_ABI = JSON.parse(fileDiGiHub);
exports.DIGI_HUB_CONTRACT = getParamOrExit('DIGI_HUB_CONTRACT');
exports.DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT = getParamOrExit('DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT');
exports.DIGI_TOKEN_HANDLE_REGISTRY_ABI = JSON.parse(fileDiGiTokenHandleRegistry);
exports.PROFILE_ID = getParam('PROFILE_ID');
exports.INFURA_PROJECT_ID = getParam('INFURA_PROJECT_ID');
exports.INFURA_SECRET = getParam('INFURA_SECRET');
exports.USE_GASLESS = getParam('USE_GASLESS') === 'true';
exports.ORIGIN = exports.USE_GASLESS
    ? getParamOrExit('ORIGIN', 'You must supply the ORIGIN env var when USE_GASLESS is enabled')
    : getParam('ORIGIN');
exports.POST_ID = getParam('POST_ID');
