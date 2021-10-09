"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMaxPool = exports.MaxPool = exports.GlobalAveragePool = exports.AveragePool = void 0;
class PoolBase {
    checkInputs(inputs) {
        if (!inputs || inputs.length !== 1) {
            return false;
        }
        return this.checkInputTypes(inputs);
    }
    checkInputTypes(inputs) {
        if (inputs[0].type !== 'float32' && inputs[0].type !== 'float64') {
            return false;
        }
        return true;
    }
}
class AveragePool extends PoolBase {
    initialize(attributes) {
        this.autoPad = attributes.getString('auto_pad', 'NOTSET');
        this.kernelShape = attributes.getInts('kernel_shape');
        this.strides = attributes.getInts('strides', []);
        this.pads = attributes.getInts('pads', []);
        this.countIncludePad = (attributes.getInt('count_include_pad', 0) === 0 ? false : true);
        this.ceilMode = attributes.getInt('ceil_mode', 0);
        // TODO: support attribute 'ceil_mode'
        if (this.ceilMode !== 0) {
            throw new Error('using ceil() in shape computation is not yet supported for AveragePool');
        }
    }
}
exports.AveragePool = AveragePool;
class GlobalAveragePool extends PoolBase {
    initialize(attributes) {
        this.countIncludePad = (attributes.getInt('count_include_pad', 0) === 0 ? false : true);
    }
}
exports.GlobalAveragePool = GlobalAveragePool;
class MaxPool extends PoolBase {
    initialize(attributes) {
        this.autoPad = attributes.getString('auto_pad', 'NOTSET');
        this.kernelShape = attributes.getInts('kernel_shape');
        this.strides = attributes.getInts('strides', []);
        this.pads = attributes.getInts('pads', []);
        this.ceilMode = attributes.getInt('ceil_mode', 0);
        this.storageOrder = attributes.getInt('storage_order', 0);
        // TODO: support attribute 'ceil_mode' and 'storage_order'
        if (this.storageOrder !== 0) {
            throw new Error('column major storage order is not yet supported for MaxPool');
        }
        if (this.ceilMode !== 0) {
            throw new Error('using ceil() in shape computation is not yet supported for MaxPool');
        }
    }
}
exports.MaxPool = MaxPool;
class GlobalMaxPool extends PoolBase {
    initialize(_attributes) { }
}
exports.GlobalMaxPool = GlobalMaxPool;
//# sourceMappingURL=pool.js.map