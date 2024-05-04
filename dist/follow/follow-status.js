"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followStatus = void 0;
const apollo_client_1 = require("../apollo-client");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const followStatusRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.query({
        query: generated_1.FollowStatusBulkDocument,
        variables: {
            request,
        },
    });
    return result.data.followStatusBulk;
};
const followStatus = async () => {
    const result = await followStatusRequest({
        followInfos: [
            {
                profileId: known_common_input_constants_1.knownProfileId,
                follower: known_common_input_constants_1.followerProfileId,
            },
        ],
    });
    console.log('follow status: result', result);
    return result;
};
exports.followStatus = followStatus;
(async () => {
    await (0, exports.followStatus)();
})();
