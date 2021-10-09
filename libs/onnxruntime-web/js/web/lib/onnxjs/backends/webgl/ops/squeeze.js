"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSqueezeAttributes = exports.squeeze = void 0;
const util_1 = require("../../../util");
const squeeze = (inferenceHandler, inputs, axes) => {
    validateInputs(inputs);
    const outputShape = util_1.ShapeUtil.squeezeShape(inputs[0].dims, axes);
    const output = inferenceHandler.reshapeUnpacked(inputs[0], outputShape);
    return [output];
};
exports.squeeze = squeeze;
const parseSqueezeAttributes = (node) => node.attributes.getInts('axes');
exports.parseSqueezeAttributes = parseSqueezeAttributes;
const validateInputs = (inputs) => {
    if (!inputs || inputs.length !== 1) {
        throw new Error('Squeeze requires 1 input.');
    }
    if (inputs[0].type === 'string') {
        throw new Error('invalid input tensor types.');
    }
};
//# sourceMappingURL=squeeze.js.map