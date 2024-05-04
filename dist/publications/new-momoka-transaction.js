"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const newMomokaTransactionSubscription = () => {
    apollo_client_1.apolloClient
        .subscribe({
        query: generated_1.NewMomokaTransactionDocument,
    })
        .subscribe({
        next(value) {
            console.log('new tranasction: ', value);
        },
    });
};
newMomokaTransactionSubscription();
