"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const pingRequest = async () => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.PingDocument,
    });
    return result.data.ping;
};
const ping = async () => {
    const result = await pingRequest();
    console.log('ping: result', result);
    return result;
};
exports.ping = ping;
(async () => {
    await (0, exports.ping)();
})();
