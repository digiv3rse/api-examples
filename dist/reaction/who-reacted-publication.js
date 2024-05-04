"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoReactedPublication = exports.whoReactedPublicationRequest = void 0;
const util_1 = __importDefault(require("util"));
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const whoReactedPublicationRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.WhoReactedPublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.whoReactedPublication;
};
exports.whoReactedPublicationRequest = whoReactedPublicationRequest;
const whoReactedPublication = async () => {
    const result = await (0, exports.whoReactedPublicationRequest)({
        for: known_common_input_constants_1.knownPostId,
    });
    console.log('who reacted to : result', util_1.default.inspect(result, { showHidden: false, depth: null }));
    return result;
};
exports.whoReactedPublication = whoReactedPublication;
(async () => {
    await (0, exports.whoReactedPublication)();
})();
