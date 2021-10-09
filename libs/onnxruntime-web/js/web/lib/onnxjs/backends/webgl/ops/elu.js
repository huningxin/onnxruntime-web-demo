"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLElu = void 0;
const elu_1 = require("../../../ops/elu");
const glsl_source_1 = require("../glsl-source");
class WebGLElu extends elu_1.Elu {
    run(inferenceHandler, inputs) {
        return inferenceHandler.run(this, inputs);
    }
    createProgramInfo(handler, inputs) {
        const outputShape = inputs[0].dims.slice();
        const glsl = glsl_source_1.getGlsl(handler.session.backend.glContext.version);
        const shaderSource = `
      void main() {
        float v = ${glsl.texture2D}(A, TexCoords).r;
        ${glsl.output} = vec4(v >= 0.0 ? v: (exp(v) - 1.0) * ${this.alpha.toExponential()}); /* float number format */
      }
      `;
        return {
            inputLayouts: [handler.getOrCreateTextureLayout(inputs[0])],
            outputLayout: handler.createTextureLayoutFromShape(outputShape),
            samplers: ['A'],
            shaderSource,
            hasMain: true,
        };
    }
    createRunData(handler, programInfo, inputs) {
        const inputTDs = [handler.getOrCreateTextureData(inputs[0], programInfo.inputLayouts[0])];
        return {
            inputTextureDatas: inputTDs,
            outputTextureData: handler.createTextureDataFromLayout(programInfo.outputLayout, inputTDs[0].tensor.type),
            uniformData: {}
        };
    }
}
exports.WebGLElu = WebGLElu;
//# sourceMappingURL=elu.js.map