import { ethers } from 'ethers';
import { DiGiHub } from './abis/types/DiGiHub';
import { DIGI_HUB_ABI, DIGI_HUB_CONTRACT } from './config';
import { getSigner } from './ethers.service';

// digi contract info can all be found on the deployed
// contract address on polygon.
export const digiHub = new ethers.Contract(
  DIGI_HUB_CONTRACT,
  DIGI_HUB_ABI,
  getSigner()
) as unknown as DiGiHub;
