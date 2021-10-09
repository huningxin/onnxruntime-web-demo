"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepthToSpace = void 0;
class DepthToSpace {
    constructor() { }
    initialize(attributes) {
        // processing node attributes
        this.blocksize = attributes.getInt('blocksize');
        if (this.blocksize < 1) {
            throw new Error(`blocksize must be >= 1, but got : ${this.blocksize} for DepthToSpace`);
        }
        this.blocksizeSqr = this.blocksize * this.blocksize;
        this.mode = attributes.getString('mode', 'DCR');
        if (DepthToSpace.supportedModes.indexOf(this.mode) < 0) {
            throw new Error(`unrecognized mode: ${this.mode} for DepthToSpace`);
        }
    }
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        const inputType = inputs[0].type;
        const inputDimensionality = inputs[0].dims.length;
        // Input has to be a 4-D tensor
        // TODO: Support string depth-to-space.
        if (inputType === 'string' || inputDimensionality !== 4) {
            return false;
        }
        return true;
    }
}
exports.DepthToSpace = DepthToSpace;
DepthToSpace.supportedModes = ['DCR', 'CRD'];
//# sourceMappingURL=depth-to-space.js.map