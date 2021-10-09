"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cast = void 0;
const util_1 = require("../util");
class Cast {
    initialize(attributes) {
        this.to = util_1.ProtoUtil.tensorDataTypeFromProto(attributes.getInt('to'));
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[0].type === 'string') {
            return false;
        }
        return true;
    }
}
exports.Cast = Cast;
//# sourceMappingURL=cast.js.map