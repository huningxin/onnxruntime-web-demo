"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unsqueeze = void 0;
class Unsqueeze {
    initialize(attributes) {
        this.axes = attributes.getInts('axes');
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        // TODO: Support string type
        if (inputs[0].type === 'string') {
            return false;
        }
        return true;
    }
}
exports.Unsqueeze = Unsqueeze;
//# sourceMappingURL=unsqueeze.js.map