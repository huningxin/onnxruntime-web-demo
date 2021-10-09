"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concat = void 0;
class Concat {
    initialize(attributes) {
        this.axis = attributes.getInt('axis');
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length < 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        const inputType = inputs[0].type;
        const inputDimensionality = inputs[0].dims.length;
        // TODO: Support string concat
        if (inputType === 'string') {
            return false;
        }
        for (const input of inputs) {
            // make sure types of all inputs match
            if (input.type !== inputType) {
                return false;
            }
            // make sure the dimensionality of all inputs are the same
            if (input.dims.length !== inputDimensionality) {
                return false;
            }
        }
        return true;
    }
}
exports.Concat = Concat;
//# sourceMappingURL=concat.js.map