"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lrn = void 0;
class Lrn {
    initialize(attributes) {
        this.alpha = attributes.getFloat('alpha', 1E-4);
        this.beta = attributes.getFloat('beta', 0.75);
        this.bias = attributes.getFloat('bias', 1.0);
        this.size = attributes.getInt('size');
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        // input tensor must have atleast 3 dimensions
        if (inputs[0].dims.length < 3) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[0].type !== 'float32' && inputs[0].type !== 'float64') {
            return false;
        }
        return true;
    }
}
exports.Lrn = Lrn;
//# sourceMappingURL=lrn.js.map