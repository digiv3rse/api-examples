"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticationToken = exports.setAuthenticationToken = void 0;
let authenticationToken = null;
let setAuthenticationToken = (token) => {
    authenticationToken = token;
    console.log('setAuthenticationToken: token', token);
};
exports.setAuthenticationToken = setAuthenticationToken;
let getAuthenticationToken = () => {
    return authenticationToken;
};
exports.getAuthenticationToken = getAuthenticationToken;
