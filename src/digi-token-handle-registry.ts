import { ethers } from 'ethers';
import { DiGiTokenHandleRegistry } from './abis/types/DiGiTokenHandleRegistry';
import { DIGI_TOKEN_HANDLE_REGISTRY_ABI, DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT } from './config';
import { getSigner } from './ethers.service';

export const digiTokenHandleRegistry = new ethers.Contract(
  DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT,
  DIGI_TOKEN_HANDLE_REGISTRY_ABI,
  getSigner()
) as unknown as DiGiTokenHandleRegistry;
