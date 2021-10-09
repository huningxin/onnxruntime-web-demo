"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInternalActivationAttributes = exports.getActicationSnippet = void 0;
const unary_op_1 = require("./unary-op");
function getActicationSnippet(attributes) {
    let func;
    switch (attributes.activation) {
        case 'Relu':
            func = unary_op_1.glslRelu();
            break;
        case 'Sigmoid':
            func = unary_op_1.glslSigmoid();
            break;
        case 'Clip':
            func = unary_op_1.glslClip(attributes.clipMin, attributes.clipMax);
            break;
        // TODO: adding other activations that can be fused.
        default:
            return { activationFunction: '', applyActivation: '' };
    }
    const activationName = func.name;
    const activationFunction = func.body;
    const applyActivation = `value = ${activationName}_(value);`;
    return { activationFunction, applyActivation };
}
exports.getActicationSnippet = getActicationSnippet;
const parseInternalActivationAttributes = (attributes) => {
    const activation = attributes.getString('__internal_activation', '');
    if (activation === 'Clip') {
        const clipMax = attributes.getFloat('__clip_max', 3.402823e+38);
        const clipMin = attributes.getFloat('__clip_min', -3.402823e+38);
        return { activation, clipMax, clipMin, activationCacheKey: `${activation}:${clipMin},${clipMax}` };
    }
    return { activation, activationCacheKey: activation };
};
exports.parseInternalActivationAttributes = parseInternalActivationAttributes;
//# sourceMappingURL=fuse-utils.js.map