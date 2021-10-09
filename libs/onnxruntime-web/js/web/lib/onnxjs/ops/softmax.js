"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Softmax = void 0;
class Softmax {
    initialize(attributes) {
        this.axis = attributes.getInt('axis', 1);
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
exports.Softmax = Softmax;
//# sourceMappingURL=softmax.js.map