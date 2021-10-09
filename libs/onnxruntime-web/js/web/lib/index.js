"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("onnxruntime-common"), exports);
const onnxruntime_common_1 = require("onnxruntime-common");
const backend_onnxjs_1 = require("./backend-onnxjs");
const backend_wasm_1 = require("./backend-wasm");
onnxruntime_common_1.registerBackend('webgl', backend_onnxjs_1.onnxjsBackend, 1);
onnxruntime_common_1.registerBackend('wasm', backend_wasm_1.wasmBackend, 2);
//# sourceMappingURL=index.js.map