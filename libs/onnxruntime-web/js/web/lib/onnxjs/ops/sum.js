"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sum = void 0;
class Sum {
    initialize(_attributes) { }
    checkInputs(inputs) {
        if (!inputs || inputs.length === 0) {
            return false;
        }
        const length = inputs[0].dims.length;
        for (let i = 1; i < inputs.length; i++) {
            if (length !== inputs[i].dims.length) {
                return false;
            }
            for (let j = 0; j < length; j++) {
                if (inputs[0].dims[j] !== inputs[i].dims[j]) {
                    return false;
                }
            }
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[0].type !== 'float32' && inputs[0].type !== 'float64') {
            return false;
        }
        for (let i = 1; i < inputs.length; i++) {
            if (inputs[0].type !== inputs[i].type) {
                return false;
            }
        }
        return true;
    }
}
exports.Sum = Sum;
//# sourceMappingURL=sum.js.map