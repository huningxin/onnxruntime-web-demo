import { AttributeWithCacheKey } from '../../../attribute-with-cache-key';
import { OperatorImplementation, OperatorInitialization } from '../../../operators';
export interface SoftmaxAttributes extends AttributeWithCacheKey {
    readonly axis: number;
}
export declare const softmax: OperatorImplementation<SoftmaxAttributes>;
export declare const parseSoftmaxAttributes: OperatorInitialization<SoftmaxAttributes>;
