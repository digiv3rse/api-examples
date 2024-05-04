"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digiHub = void 0;
const ethers_1 = require("ethers");
const config_1 = require("./config");
const ethers_service_1 = require("./ethers.service");
// digi contract info can all be found on the deployed
// contract address on polygon.
exports.digiHub = new ethers_1.ethers.Contract(config_1.DIGI_HUB_CONTRACT, config_1.DIGI_HUB_ABI, (0, ethers_service_1.getSigner)());
