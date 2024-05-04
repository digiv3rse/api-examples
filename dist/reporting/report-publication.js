"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportPublication = void 0;
const apollo_client_1 = require("../apollo-client");
const login_1 = require("../authentication/login");
const ethers_service_1 = require("../ethers.service");
const generated_1 = require("../graphql/generated");
const known_common_input_constants_1 = require("../known-common-input-constants");
const reportPublicationRequest = async (request) => {
    const result = await apollo_client_1.apolloClient.mutate({
        mutation: generated_1.ReportPublicationDocument,
        variables: {
            request,
        },
    });
    return result.data.reportPublication;
};
const reportPublication = async () => {
    const address = (0, ethers_service_1.getAddressFromSigner)();
    console.log('report publication: address', address);
    await (0, login_1.login)(address);
    await reportPublicationRequest({
        for: known_common_input_constants_1.knownPostId,
        reason: {
            sensitiveReason: {
                reason: generated_1.PublicationReportingReason.Sensitive,
                subreason: generated_1.PublicationReportingSensitiveSubreason.Offensive,
            },
        },
        additionalComments: 'Testing report!',
    });
    console.log('report publication: success');
};
exports.reportPublication = reportPublication;
(async () => {
    await (0, exports.reportPublication)();
})();
