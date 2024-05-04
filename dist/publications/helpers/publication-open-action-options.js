"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleCollectFreeAndNoLimitEndsAt = exports.simpleCollectFreeAndNoLimit = exports.simpleCollectFreeAndLimitEndsAt = exports.simpleCollectFreeAndLimit = exports.simpleCollectAmountAndLimitAndEndsAt = exports.simpleCollectAmountAndLimit = void 0;
const simpleCollectAmountAndLimit = (recipient, collectLimit = '100', referralFee = 20, followerOnly = false) => {
    return {
        collectOpenAction: {
            simpleCollectOpenAction: {
                amount: {
                    currency: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
                    value: '10',
                },
                collectLimit,
                followerOnly,
                referralFee,
                recipient,
            },
        },
    };
};
exports.simpleCollectAmountAndLimit = simpleCollectAmountAndLimit;
const simpleCollectAmountAndLimitAndEndsAt = (recipient, collectLimit = '100', endsAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), referralFee = 20, followerOnly = false) => {
    return {
        collectOpenAction: {
            simpleCollectOpenAction: {
                amount: {
                    currency: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
                    value: '10',
                },
                collectLimit,
                followerOnly,
                referralFee,
                recipient,
                endsAt: endsAt.toISOString(),
            },
        },
    };
};
exports.simpleCollectAmountAndLimitAndEndsAt = simpleCollectAmountAndLimitAndEndsAt;
const simpleCollectFreeAndLimit = (collectLimit = '100', followerOnly = false) => {
    return {
        collectOpenAction: {
            simpleCollectOpenAction: {
                collectLimit,
                followerOnly,
            },
        },
    };
};
exports.simpleCollectFreeAndLimit = simpleCollectFreeAndLimit;
const simpleCollectFreeAndLimitEndsAt = (collectLimit = '100', endsAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), followerOnly = false) => {
    return {
        collectOpenAction: {
            simpleCollectOpenAction: {
                collectLimit,
                followerOnly,
                endsAt: endsAt.toISOString(),
            },
        },
    };
};
exports.simpleCollectFreeAndLimitEndsAt = simpleCollectFreeAndLimitEndsAt;
const simpleCollectFreeAndNoLimit = (followerOnly = false) => {
    return {
        collectOpenAction: {
            simpleCollectOpenAction: {
                followerOnly,
            },
        },
    };
};
exports.simpleCollectFreeAndNoLimit = simpleCollectFreeAndNoLimit;
const simpleCollectFreeAndNoLimitEndsAt = (endsAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), followerOnly = false) => {
    return {
        collectOpenAction: {
            simpleCollectOpenAction: {
                followerOnly,
                endsAt: endsAt.toISOString(),
            },
        },
    };
};
exports.simpleCollectFreeAndNoLimitEndsAt = simpleCollectFreeAndNoLimitEndsAt;
