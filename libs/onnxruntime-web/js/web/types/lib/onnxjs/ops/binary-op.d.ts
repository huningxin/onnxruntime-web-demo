import { Attribute } from '../attribute';
import { InferenceHandler } from '../backend';
import { Operator } from '../operators';
import { Tensor } from '../tensor';
export declare abstract class BinaryOp implements Operator {
    protected typeConstraint: readonly Tensor.DataType[];
    protected opType?: string | undefined;
    protected resultType?: keyof Tensor.DataTypeMap | undefined;
    constructor(typeConstraint: readonly Tensor.DataType[], opType?: string | undefined, resultType?: keyof Tensor.DataTypeMap | undefined);
    abstract run(inferenceHandler: InferenceHandler, inputs: Tensor[]): Tensor[] | Promise<Tensor[]>;
    initialize(_attributes: Attribute): void;
    checkInputs(inputs: Tensor[]): boolean;
    protected checkInputTypes(inputs: Tensor[]): boolean;
}
