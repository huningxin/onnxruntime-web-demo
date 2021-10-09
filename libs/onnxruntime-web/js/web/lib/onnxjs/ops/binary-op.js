"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryOp = void 0;
class BinaryOp {
    constructor(typeConstraint, opType, resultType) {
        this.typeConstraint = typeConstraint;
        this.opType = opType;
        this.resultType = resultType;
    }
    initialize(_attributes) { }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 2) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (this.typeConstraint.indexOf(inputs[0].type) === -1) {
            return false;
        }
        if (inputs[0].type !== inputs[1].type) {
            return false;
        }
        return true;
    }
}
exports.BinaryOp = BinaryOp;
//# sourceMappingURL=binary-op.js.map