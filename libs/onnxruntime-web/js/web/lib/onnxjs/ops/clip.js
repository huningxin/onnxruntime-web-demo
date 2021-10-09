"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clip = void 0;
class Clip {
    initialize(attributes) {
        this.min = attributes.getFloat('min', -3.4028234663852886e+38);
        this.max = attributes.getFloat('max', 3.4028234663852886e+38);
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
exports.Clip = Clip;
//# sourceMappingURL=clip.js.map