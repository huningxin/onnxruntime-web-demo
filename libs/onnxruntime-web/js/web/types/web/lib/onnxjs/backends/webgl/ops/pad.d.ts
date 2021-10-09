import { AttributeWithCacheKey } from '../../../attribute-with-cache-key';
import { OperatorImplementation, OperatorInitialization } from '../../../operators';
export interface PadAttributes extends AttributeWithCacheKey {
    readonly mode: string;
    readonly pads: number[];
    readonly value: number;
}
export declare const pad: OperatorImplementation<PadAttributes>;
export declare const parsePadAttributes: OperatorInitialization<PadAttributes>;
