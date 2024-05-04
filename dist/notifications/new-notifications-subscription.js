"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("../apollo-client");
const config_1 = require("../config");
const generated_1 = require("../graphql/generated");
const newNotificationsSubscription = (profileId) => {
    apollo_client_1.apolloClient
        .subscribe({
        query: generated_1.NotificationsSubscriptionDocument,
        variables: {
            for: profileId,
        },
    })
        .subscribe({
        next(value) {
            console.log('newNotificationsSubscription:', value);
        },
    });
};
if (!config_1.PROFILE_ID) {
    throw new Error('Must define PROFILE_ID in the .env to run this');
}
newNotificationsSubscription(config_1.PROFILE_ID);
