"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digiTokenHandleRegistry = void 0;
const ethers_1 = require("ethers");
const config_1 = require("./config");
const ethers_service_1 = require("./ethers.service");
exports.digiTokenHandleRegistry = new ethers_1.ethers.Contract(config_1.DIGI_TOKEN_HANDLE_REGISTRY_CONTRACT, config_1.DIGI_TOKEN_HANDLE_REGISTRY_ABI, (0, ethers_service_1.getSigner)());
