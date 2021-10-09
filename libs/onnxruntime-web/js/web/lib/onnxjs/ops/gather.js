"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gather = void 0;
const operators_1 = require("../operators");
class Gather {
    initialize(attributes) {
        this.axis = attributes.getInt('axis', 0);
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 2) {
            return false;
        }
        const tensorRank = inputs[0].dims.length;
        if (tensorRank < 1) {
            return false;
        }
        if (this.axis < -tensorRank || this.axis > tensorRank - 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (operators_1.NUMBER_TYPES.indexOf(inputs[0].type) === -1) {
            return false;
        }
        if (inputs[1].type !== 'int32' && inputs[1].type !== 'int16') {
            return false;
        }
        return true;
    }
}
exports.Gather = Gather;
//# sourceMappingURL=gather.js.map