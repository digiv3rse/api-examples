"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloClient = void 0;
const core_1 = require("@apollo/client/core");
const ws_1 = require("@apollo/client/link/ws");
const ws_2 = __importDefault(require("ws"));
const error_1 = require("@apollo/client/link/error");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const printer_1 = require("graphql/language/printer");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const config_1 = require("./config");
const state_1 = require("./state");
const utilities_1 = require("@apollo/client/utilities");
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};
const wsLink = config_1.DIGI_API_WEBSOCKET
    ? new ws_1.WebSocketLink(new subscriptions_transport_ws_1.SubscriptionClient(config_1.DIGI_API_WEBSOCKET, { lazy: true, reconnect: true }, ws_2.default))
    : null;
const httpLink = new core_1.HttpLink({
    uri: config_1.DIGI_API,
    fetch: cross_fetch_1.default,
});
const errorLink = (0, error_1.onError)(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach((error) => console.log('[GraphQL error]:', JSON.stringify(error, null, 2)));
    }
    if (networkError) {
        console.log('[Network error]:', JSON.stringify(networkError, null, 2));
    }
});
// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new core_1.ApolloLink((operation, forward) => {
    const token = (0, state_1.getAuthenticationToken)();
    console.log('jwt token:', token);
    const logMessage = `GraphQL Query: ${(0, printer_1.print)(operation.query)}, Variables: ${JSON.stringify(operation.variables)}`;
    console.log(logMessage);
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            'x-access-token': token ? `Bearer ${token}` : '',
            ...(config_1.ORIGIN ? { origin: config_1.ORIGIN } : {}),
        },
    });
    // Call the next link in the middleware chain.
    return forward(operation);
});
const splitLink = wsLink
    ? (0, core_1.split)(({ query }) => {
        const definition = (0, utilities_1.getMainDefinition)(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    }, wsLink, httpLink)
    : httpLink;
exports.apolloClient = new core_1.ApolloClient({
    link: (0, core_1.from)([errorLink, authLink, splitLink]),
    cache: new core_1.InMemoryCache(),
    defaultOptions: defaultOptions,
});
