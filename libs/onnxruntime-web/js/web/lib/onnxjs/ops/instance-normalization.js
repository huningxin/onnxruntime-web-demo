"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceNormalization = void 0;
class InstanceNormalization {
    initialize(attributes) {
        this.epsilon = attributes.getFloat('epsilon', 1e-5);
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 3) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        const X = inputs[0];
        const scale = inputs[1];
        const B = inputs[2];
        // input should atleast have three dimensions - N,C,dim1,...,dimn
        // other inputs can have only one dimensions
        if (X.dims.length < 3 || scale.dims.length !== 1 || B.dims.length !== 1) {
            return false;
        }
        if (scale.dims[0] !== X.dims[1] || B.dims[0] !== X.dims[1]) {
            return false;
        }
        if ((X.type !== 'float32' && X.type !== 'float64') || (scale.type !== 'float32' && scale.type !== 'float64') ||
            (B.type !== 'float32' && B.type !== 'float64')) {
            return false;
        }
        return true;
    }
}
exports.InstanceNormalization = InstanceNormalization;
//# sourceMappingURL=instance-normalization.js.map