import { Attribute } from '../attribute';
import { InferenceHandler } from '../backend';
import { Operator } from '../operators';
import { Tensor } from '../tensor';
export declare abstract class Conv implements Operator {
    abstract run(inferenceHandler: InferenceHandler, inputs: Tensor[]): Tensor[] | Promise<Tensor[]>;
    initialize(attributes: Attribute): void;
    checkInputs(inputs: Tensor[]): boolean;
    protected checkInputTypes(inputs: Tensor[]): boolean;
    protected autoPad: string;
    protected dilations: number[];
    protected group: number;
    protected kernelShape: number[];
    protected pads: number[];
    protected strides: number[];
    protected activation: string;
}
