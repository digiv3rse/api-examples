import fs from 'fs';
import path from 'path';

const fileDiGiHub = fs.readFileSync(
  path.join(__dirname, 'abis/digi-hub-contract-abi.json'),
  'utf8'
);
const fileDiGiTokenHandleRegistry = fs.readFileSync(
  path.join(__dirname, 'abis/digi-token-handle-registry-contract-abi.json'),
  'utf8'
);

const getParamOrExit = (name: string, errorMessage?: string) => {
  const param = process.env[name];
  if (!param) {
    console.error(errorMessage ?? `Required config param '${name}' missing`);
    process.exit(1);
  }
  return param;
};

const getParam = (name: string) => {
  const param = process.env[name];
  if (!param) {
    return null;
  }
  return param;
};

export const explicitStart = (filename: string) => {
  const scriptName = path.basename(process.argv[1]);
  return path.basename(filename).includes(scriptName);
};

export const PK = getParamOrExit('PK');

export const RPC_URL = getParamOrExit('RPC_URL');

export const DIGI_API = getParamOrExit('DIGI_API');
export const DIGI_API_WEBSOCKET = getParam('DIGI_API_WEBSOCKET');

export const DIGI_HUB_ABI = JSON.parse(fileDiGiHub);

export const DIGI_HUB_CONTRACT = getParamOrExit('DIGI_HUB_CONTRACT');

export const DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT = getParamOrExit(
  'DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT'
);

export const DIGI_TOKEN_HANDLE_REGISTRY_ABI = JSON.parse(fileDiGiTokenHandleRegistry);

export const PROFILE_ID = getParam('PROFILE_ID');

export const INFURA_PROJECT_ID = getParam('INFURA_PROJECT_ID');

export const INFURA_SECRET = getParam('INFURA_SECRET');

export const USE_GASLESS = getParam('USE_GASLESS') === 'true';

export const ORIGIN = USE_GASLESS
  ? getParamOrExit('ORIGIN', 'You must supply the ORIGIN env var when USE_GASLESS is enabled')
  : getParam('ORIGIN');

export const POST_ID = getParam('POST_ID');
