"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gemm = void 0;
class Gemm {
    constructor(isOptionalC) {
        this.isOptionalC = isOptionalC;
    }
    initialize(attributes) {
        this.transA = attributes.getInt('transA', 0) !== 0;
        this.transB = attributes.getInt('transB', 0) !== 0;
        this.alpha = attributes.getFloat('alpha', 1);
        this.beta = attributes.getFloat('beta', 1);
    }
    checkInputs(inputs) {
        if (!inputs) {
            return false;
        }
        if (this.isOptionalC && (inputs.length < 2 || inputs.length > 3)) {
            return false;
        }
        if (!this.isOptionalC && inputs.length !== 3) {
            return false;
        }
        // 'C' can be of dimensionality 1 or 2 only
        if (inputs.length === 3 && inputs[2].dims.length !== 1 && inputs[2].dims.length !== 2) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if ((inputs[0].type !== 'float32' && inputs[0].type !== 'float64') ||
            (inputs[1].type !== 'float32' && inputs[1].type !== 'float64') ||
            (inputs.length === 3 && inputs[2].type !== 'float32' && inputs[2].type !== 'float64')) {
            return false;
        }
        if ((inputs[0].type !== inputs[1].type) || (inputs.length === 3 && inputs[0].type !== inputs[2].type)) {
            return false;
        }
        return true;
    }
}
exports.Gemm = Gemm;
//# sourceMappingURL=gemm.js.map