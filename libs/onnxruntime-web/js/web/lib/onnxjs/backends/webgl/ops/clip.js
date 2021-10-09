"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLClip = void 0;
const clip_1 = require("../../../ops/clip");
const glsl_source_1 = require("../glsl-source");
class WebGLClip extends clip_1.Clip {
    run(inferenceHandler, inputs) {
        return inferenceHandler.run(this, inputs);
    }
    createProgramInfo(handler, inputs) {
        const outputShape = inputs[0].dims.slice();
        const glsl = glsl_source_1.getGlsl(handler.session.backend.glContext.version);
        const shaderSource = `
      const float min = float(${this.min});
      const float max = float(${this.max});
      void main() {
        float v = ${glsl.texture2D}(A, TexCoords).r;
        ${glsl.output} = vec4(clamp(v, min, max));
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
exports.WebGLClip = WebGLClip;
//# sourceMappingURL=clip.js.map