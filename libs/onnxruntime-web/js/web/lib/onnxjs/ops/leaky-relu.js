"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeakyRelu = void 0;
class LeakyRelu {
    initialize(attributes) {
        this.alpha = attributes.getFloat('alpha', 0.01);
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
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
exports.LeakyRelu = LeakyRelu;
//# sourceMappingURL=leaky-relu.js.map