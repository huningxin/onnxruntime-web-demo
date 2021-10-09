"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnaryOp = void 0;
class UnaryOp {
    constructor(typeConstraint, resultType) {
        this.typeConstraint = typeConstraint;
        this.resultType = resultType;
    }
    initialize(_attributes) { }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (this.typeConstraint.indexOf(inputs[0].type) === -1) {
            return false;
        }
        return true;
    }
}
exports.UnaryOp = UnaryOp;
//# sourceMappingURL=unary-op.js.map