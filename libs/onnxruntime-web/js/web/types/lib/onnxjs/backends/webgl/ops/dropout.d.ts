import { Dropout } from '../../../ops/dropout';
import { Tensor } from '../../../tensor';
import { WebGLInferenceHandler } from '../inference-handler';
import { ProgramInfo, RunData, WebGLOperator } from '../types';
export declare class WebGLDropout extends Dropout implements WebGLOperator {
    run(inferenceHandler: WebGLInferenceHandler, inputs: Tensor[]): Tensor[];
    createProgramInfo(_handler: WebGLInferenceHandler, _inputs: Tensor[]): ProgramInfo;
    createRunData(_handler: WebGLInferenceHandler, _programInfo: ProgramInfo, _inputs: Tensor[]): RunData;
}
