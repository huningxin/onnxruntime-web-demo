"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pad = void 0;
class Pad {
    initialize(attributes) {
        this.mode = attributes.getString('mode', 'constant');
        this.value = attributes.getFloat('value', 0.0);
        this.pads = attributes.getInts('pads');
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
exports.Pad = Pad;
//# sourceMappingURL=pad.js.map