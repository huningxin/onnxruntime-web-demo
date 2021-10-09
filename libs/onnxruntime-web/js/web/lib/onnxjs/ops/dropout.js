"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropout = void 0;
class Dropout {
    initialize(attributes) {
        this.ratio = attributes.getFloat('ratio', 0.5);
        this.testMode = true; // this is a hack to reflect that test mode is hardcoded
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
exports.Dropout = Dropout;
//# sourceMappingURL=dropout.js.map