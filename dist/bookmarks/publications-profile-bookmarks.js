"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarks = void 0;
const util_1 = __importDefault(require("util"));
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const config_1 = require("../config");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const publicationsProfileBookmarks = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PublicationBookmarksDocument,
        variables: {
            request,
        },
    });
    return result.data.publicationBookmarks;
};
const bookmarks = async () => {
    const profileId = config_1.PROFILE_ID;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('bookmarks: address', address);
    await (0, login_1.login)(address);
    const result = await publicationsProfileBookmarks({});
    console.log('bookmarks: result', util_1.default.inspect(result, { showHidden: false, depth: null }));
    return result;
};
exports.bookmarks = bookmarks;
(async () => {
    await (0, exports.bookmarks)();
})();
