"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageScaler = void 0;
class ImageScaler {
    initialize(attributes) {
        this.scale = attributes.getFloat('scale');
        this.bias = attributes.getFloats('bias');
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        if (inputs[0].dims.length !== 4) {
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
exports.ImageScaler = ImageScaler;
//# sourceMappingURL=image-scaler.js.map