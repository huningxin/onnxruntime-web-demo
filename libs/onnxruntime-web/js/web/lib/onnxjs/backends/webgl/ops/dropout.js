"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLDropout = void 0;
const dropout_1 = require("../../../ops/dropout");
class WebGLDropout extends dropout_1.Dropout {
    run(inferenceHandler, inputs) {
        if (this.testMode) {
            return [inputs[0]];
        }
        throw new Error('Non test mode Dropout is not implemented yet');
    }
    createProgramInfo(_handler, _inputs) {
        throw new Error('Non test mode Dropout is not implemented yet');
    }
    createRunData(_handler, _programInfo, _inputs) {
        throw new Error('Non test mode Dropout is not implemented yet');
    }
}
exports.WebGLDropout = WebGLDropout;
//# sourceMappingURL=dropout.js.map