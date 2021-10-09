"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliceV10 = exports.Slice = void 0;
const operators_1 = require("../operators");
class Slice {
    initialize(attributes) {
        this.starts = attributes.getInts('starts');
        this.ends = attributes.getInts('ends');
        this.axes = attributes.getInts('axes', []);
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
exports.Slice = Slice;
class SliceV10 {
    initialize(_attributes) { }
    checkInputs(inputs) {
        if (!inputs || inputs.length < 3 || inputs.length > 5) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[1].type !== 'int32' || inputs[1].dims.length !== 1) {
            return false;
        }
        if (inputs[2].type !== 'int32' || inputs[2].dims.length !== 1) {
            return false;
        }
        if (inputs.length >= 4 && (inputs[3].type !== 'int32' || inputs[3].dims.length !== 1)) {
            return false;
        }
        if (inputs.length >= 5 && (inputs[4].type !== 'int32' || inputs[4].dims.length !== 1)) {
            return false;
        }
        return true;
    }
}
exports.SliceV10 = SliceV10;
//# sourceMappingURL=slice.js.map