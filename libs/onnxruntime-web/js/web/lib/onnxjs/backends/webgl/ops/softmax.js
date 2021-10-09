"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSoftmaxAttributes = exports.softmax = void 0;
const attribute_with_cache_key_1 = require("../../../attribute-with-cache-key");
const util_1 = require("../../../util");
const glsl_source_1 = require("../glsl-source");
const types_1 = require("../types");
const softmaxComputeMaxProgramMetadata = {
    name: 'SoftmaxComputeMax',
    inputNames: ['A'],
    inputTypes: [types_1.TextureType.unpacked],
};
const softmaxComputeScaleProgramMetadata = {
    name: 'SoftmaxComputeScale',
    inputNames: ['A', 'Max'],
    inputTypes: [types_1.TextureType.unpacked, types_1.TextureType.unpacked],
};
const softmaxProgramMetadata = {
    name: 'SoftMax',
    inputNames: ['A', 'Max', 'Norm'],
    inputTypes: [types_1.TextureType.unpacked, types_1.TextureType.unpacked, types_1.TextureType.unpacked],
};
const softmax = (inferenceHandler, inputs, attributes) => {
    validateInputs(inputs);
    const inputShape = inputs[0].dims.slice();
    const axis = util_1.ShapeUtil.normalizeAxis(attributes.axis, inputShape.length);
    const N = util_1.ShapeUtil.sizeToDimension(inputShape, axis);
    const D = util_1.ShapeUtil.sizeFromDimension(inputShape, axis);
    const computeMaxProgramInfo = createComputeMaxProgramInfo(inferenceHandler, inputs[0], N, D, [N]);
    const max = inferenceHandler.run(Object.assign(Object.assign({}, softmaxComputeMaxProgramMetadata), { cacheHint: attributes.cacheKey, get: () => computeMaxProgramInfo }), inputs);
    const computeScaleProgramInfo = createComputScaleProgramInfo(inferenceHandler, inputs[0], N, D, computeMaxProgramInfo.output.dims, [N]);
    const scale = inferenceHandler.run(Object.assign(Object.assign({}, softmaxComputeScaleProgramMetadata), { cacheHint: attributes.cacheKey, get: () => computeScaleProgramInfo }), [inputs[0], max]);
    const softMaxProgramInfo = createSoftMaxProgramInfo(inferenceHandler, inputs[0], N, D, computeMaxProgramInfo.output.dims, computeScaleProgramInfo.output.dims);
    const output = inferenceHandler.run(Object.assign(Object.assign({}, softmaxProgramMetadata), { cacheHint: attributes.cacheKey, get: () => softMaxProgramInfo }), [inputs[0], max, scale]);
    return [output];
};
exports.softmax = softmax;
const parseSoftmaxAttributes = (node) => attribute_with_cache_key_1.createAttributeWithCacheKey({ axis: node.attributes.getInt('axis', 1) });
exports.parseSoftmaxAttributes = parseSoftmaxAttributes;
/**
 * Create a texture that contains the maximum value of each of the 'N' rows
 */
const createComputeMaxProgramInfo = 
// eslint-disable-next-line @typescript-eslint/naming-convention
(inferenceHandler, input, N, D, outputShape) => {
    const [textureWidth, textureHeight] = inferenceHandler.calculateTextureWidthAndHeight(input.dims, types_1.TextureType.unpacked);
    const rank = outputShape.length;
    if (N < 1 || D < 1) {
        throw new Error('Logical row count N and feature count D must be greater than or equal to 1');
    }
    if (outputShape.length !== 1) {
        throw new Error('Dimensionality of the output should be 1');
    }
    if (outputShape[0] !== N) {
        throw new Error('Shape of the output should be equal to logical row count');
    }
    const glsl = glsl_source_1.getGlsl(inferenceHandler.session.backend.glContext.version);
    const shaderSource = `
      float process(int[${rank}] indices) {
        int logical_row_start_offset = indices[0] * ${D};

        float max = getColorAsFloat(${glsl.texture2D}(A, offsetToCoords(logical_row_start_offset, ${textureWidth},
        ${textureHeight} )));
        for(int i=1; i<${D}; ++i)
        {
          float current = getColorAsFloat(${glsl.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${textureWidth}, ${textureHeight})));
          if(current > max)
          max = current;
        }

        return max;
      }`;
    return Object.assign(Object.assign({}, softmaxComputeMaxProgramMetadata), { output: { dims: outputShape, type: input.type, textureType: types_1.TextureType.unpacked }, shaderSource });
};
/**
 * Create a texture that contains the normalization factor for each of the 'N' rows
 */
const createComputScaleProgramInfo = 
// eslint-disable-next-line @typescript-eslint/naming-convention
(inferenceHandler, input, N, D, maxElementPerLogicalRow, outputShape) => {
    const [textureWidth, textureHeight] = inferenceHandler.calculateTextureWidthAndHeight(input.dims, types_1.TextureType.unpacked);
    const rank = outputShape.length;
    if (N < 1 || D < 1) {
        throw new Error('Logical row count N and feature count D must be greater than or equal to 1');
    }
    if (outputShape.length !== 1) {
        throw new Error('Dimensionality of the output should be 1');
    }
    if (outputShape[0] !== N) {
        throw new Error('Shape of the output should be equal to logical row count');
    }
    if (maxElementPerLogicalRow.length !== 1) {
        throw new Error('Dimensionality of the intermediate results should be 1');
    }
    if (maxElementPerLogicalRow[0] !== N) {
        throw new Error('Shape of the intermediate results should be equal to logical row count');
    }
    const glsl = glsl_source_1.getGlsl(inferenceHandler.session.backend.glContext.version);
    const shaderSource = `
      float process(int[${rank}] indices) {
        int logical_row_start_offset = indices[0] * ${D};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${D}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${glsl.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${textureWidth}, ${textureHeight}))) - max);
        }

        return norm_factor;
      }`;
    return Object.assign(Object.assign({}, softmaxComputeScaleProgramMetadata), { output: { dims: outputShape, type: input.type, textureType: types_1.TextureType.unpacked }, shaderSource });
};
const createSoftMaxProgramInfo = 
// eslint-disable-next-line @typescript-eslint/naming-convention
(inferenceHandler, input, N, D, maxElementPerLogicalRow, normalizationPerLogicalRow) => {
    const [textureWidth, textureHeight] = inferenceHandler.calculateTextureWidthAndHeight(input.dims, types_1.TextureType.unpacked);
    const rank = input.dims.length;
    if (N < 1 || D < 1) {
        throw new Error('Logical row count N and feature count D must be greater than or equal to 1');
    }
    if (maxElementPerLogicalRow.length !== 1 || normalizationPerLogicalRow.length !== 1) {
        throw new Error('Dimensionality of the intermediate results should be 1');
    }
    if (maxElementPerLogicalRow[0] !== N || normalizationPerLogicalRow[0] !== N) {
        throw new Error('Shape of the intermediate results should be equal to logical row count');
    }
    const shaderSource = `
      float process(int[${rank}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${textureWidth}, ${textureHeight});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${D};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;
    return Object.assign(Object.assign({}, softmaxProgramMetadata), { output: { dims: input.dims, type: input.type, textureType: types_1.TextureType.unpacked }, shaderSource });
};
const validateInputs = (inputs) => {
    if (!inputs || inputs.length !== 1) {
        throw new Error('Softmax requires 1 input.');
    }
    if (inputs[0].type !== 'float32' && inputs[0].type !== 'float64') {
        throw new Error('Invalid input type');
    }
};
//# sourceMappingURL=softmax.js.map