"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.sleep = exports.prettyJSON = void 0;
// @ts-ignore
const omit_deep_1 = __importDefault(require("omit-deep"));
const prettyJSON = (message, obj) => {
    console.log(message, JSON.stringify(obj, null, 2));
};
exports.prettyJSON = prettyJSON;
const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
exports.sleep = sleep;
const omit = (object, name) => {
    return (0, omit_deep_1.default)(object, name);
};
exports.omit = omit;
