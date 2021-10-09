"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduceBase = void 0;
const operators_1 = require("../operators");
class ReduceBase {
    initialize(attributes) {
        this.axes = attributes.getInts('axes', []);
        this.keepDims = attributes.getInt('keepdims', 1) === 1;
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (operators_1.NUMBER_TYPES.indexOf(inputs[0].type) === -1) {
            return false;
        }
        return true;
    }
}
exports.ReduceBase = ReduceBase;
//# sourceMappingURL=reduce-op.js.map