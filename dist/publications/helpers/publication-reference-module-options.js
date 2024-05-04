"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceModuleUnknownReferenceModule = exports.referenceModuleDegreesOfSeparation = exports.referenceModuleFollowOnly = void 0;
exports.referenceModuleFollowOnly = {
    followerOnlyReferenceModule: true,
};
const referenceModuleDegreesOfSeparation = (input) => {
    return {
        degreesOfSeparationReferenceModule: input,
    };
};
exports.referenceModuleDegreesOfSeparation = referenceModuleDegreesOfSeparation;
const referenceModuleUnknownReferenceModule = (input) => {
    return {
        unknownReferenceModule: input,
    };
};
exports.referenceModuleUnknownReferenceModule = referenceModuleUnknownReferenceModule;
