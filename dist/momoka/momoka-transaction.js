"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const post_momoka_1 = require("../publications/post-momoka");
(async function () {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('post on momoka broadcast: address', address);
    await (0, login_1.login)(address);
    const post = await (0, post_momoka_1.postOnMomoka)();
    if (!post) {
        console.error('post on momoka broadcast: failed');
        return;
    }
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.MomokaTransactionDocument,
        variables: { request: { for: post.proof.replace('ar://', '') } },
    });
    if (!result.data.momokaTransaction) {
        console.error('momoka transaction by momoka id: failed');
        return;
    }
    console.log(`momoka transaction publication id: result: ${result.data.momokaTransaction.publication.id}`);
})();
