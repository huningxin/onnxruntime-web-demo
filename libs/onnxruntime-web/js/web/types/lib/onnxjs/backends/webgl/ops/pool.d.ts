import { AttributeWithCacheKey } from '../../../attribute-with-cache-key';
import { OperatorImplementation, OperatorInitialization } from '../../../operators';
import { Tensor } from '../../../tensor';
import { WebGLInferenceHandler } from '../inference-handler';
export interface AveragePoolAttributes extends AttributeWithCacheKey {
    readonly autoPad: string;
    readonly ceilMode: number;
    readonly countIncludePad: boolean;
    readonly kernelShape: number[];
    readonly strides: number[];
    readonly pads: number[];
}
export declare const averagePool: OperatorImplementation<AveragePoolAttributes>;
export declare const parseAveragePoolAttributes: OperatorInitialization<AveragePoolAttributes>;
export declare const globalAveragePool: OperatorImplementation<AveragePoolAttributes>;
export declare const parseGlobalAveragePoolAttributes: OperatorInitialization<AveragePoolAttributes>;
export interface MaxPoolAttributes extends AveragePoolAttributes {
    readonly storageOrder: number;
}
export declare const maxPool: OperatorImplementation<MaxPoolAttributes>;
export declare const parseMaxPoolAttributes: OperatorInitialization<MaxPoolAttributes>;
export declare const globalMaxPool: (inferenceHandler: WebGLInferenceHandler, inputs: Tensor[]) => Tensor[];
