"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Split = void 0;
class Split {
    constructor(numOutputs) {
        this.numOutputs = numOutputs;
    }
    initialize(attributes) {
        this.axis = attributes.getInt('axis', 0);
        this.split = attributes.getInts('split', []);
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[0].type !== 'int8' && inputs[0].type !== 'uint8' && inputs[0].type !== 'int16' &&
            inputs[0].type !== 'uint16' && inputs[0].type !== 'int32' && inputs[0].type !== 'uint32' &&
            inputs[0].type !== 'float32' && inputs[0].type !== 'float64' && inputs[0].type !== 'bool') {
            return false;
        }
        return true;
    }
}
exports.Split = Split;
//# sourceMappingURL=split.js.map