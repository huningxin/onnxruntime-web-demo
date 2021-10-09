"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reshape = void 0;
const operators_1 = require("../operators");
class Reshape {
    initialize(_attributes) { }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 2 || inputs[1].dims.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (operators_1.NUMBER_TYPES.indexOf(inputs[0].type) === -1) {
            return false;
        }
        if (inputs[1].type !== 'int32') {
            return false;
        }
        return true;
    }
}
exports.Reshape = Reshape;
//# sourceMappingURL=reshape.js.map