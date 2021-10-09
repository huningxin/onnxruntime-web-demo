"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
class Shape {
    initialize(_attributes) { }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return true;
    }
}
exports.Shape = Shape;
//# sourceMappingURL=shape.js.map