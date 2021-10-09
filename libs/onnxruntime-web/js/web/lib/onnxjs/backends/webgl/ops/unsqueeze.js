"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUnsqueezeAttributes = exports.unsqueeze = void 0;
const util_1 = require("../../../util");
const unsqueeze = (inferenceHandler, inputs, axes) => {
    validateInputs(inputs);
    const outputShape = util_1.ShapeUtil.unsqueezeShape(inputs[0].dims, axes);
    const output = inferenceHandler.reshapeUnpacked(inputs[0], outputShape);
    return [output];
};
exports.unsqueeze = unsqueeze;
const parseUnsqueezeAttributes = (node) => node.attributes.getInts('axes');
exports.parseUnsqueezeAttributes = parseUnsqueezeAttributes;
const validateInputs = (inputs) => {
    if (!inputs || inputs.length !== 1) {
        throw new Error('Unsqueeze requires 1 input.');
    }
    if (inputs[0].type === 'string') {
        throw new Error('invalid input tensor types.');
    }
};
//# sourceMappingURL=unsqueeze.js.map