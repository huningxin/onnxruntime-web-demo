"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatMul = void 0;
class MatMul {
    initialize(attributes) {
        this.activation = attributes.getString('__internal_activation', '');
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 2) {
            return false;
        }
        if (inputs[0].dims[inputs[0].dims.length - 1] !== inputs[1].dims[inputs[1].dims.length - 2]) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[0].type !== 'float32' && inputs[0].type !== 'float64') {
            return false;
        }
        if (inputs[1].type !== 'float32' && inputs[1].type !== 'float64') {
            return false;
        }
        if (inputs[0].type !== inputs[1].type) {
            return false;
        }
        return true;
    }
}
exports.MatMul = MatMul;
//# sourceMappingURL=matmul.js.map