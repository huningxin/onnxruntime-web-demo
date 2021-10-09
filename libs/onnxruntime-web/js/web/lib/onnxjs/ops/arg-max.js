"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgMax = void 0;
const operators_1 = require("../operators");
class ArgMax {
    initialize(attributes) {
        this.axis = attributes.getInt('axis', 0);
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
exports.ArgMax = ArgMax;
//# sourceMappingURL=arg-max.js.map