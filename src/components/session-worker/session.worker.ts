import registerPromiseWorker from "promise-worker/register";
import { Tensor, InferenceSession, env } from "onnxruntime-web";
import { runModelUtils } from "../../utils";
import 'webnn-polyfill';
 
// Build version
// env.wasm.wasmPaths = {
//     "ort-wasm.wasm": location.origin + "/onnxruntime-web-demo/js/ort-wasm.wasm",
//     "ort-wasm-simd.wasm": location.origin + "/onnxruntime-web-demo/js/ort-wasm-simd.wasm",
//     "ort-wasm-threaded.wasm": location.origin + "/onnxruntime-web-demo/js/ort-wasm-threaded.wasm",
//     "ort-wasm-simd-threaded.wasm":
//         location.origin + "/onnxruntime-web-demo/js/ort-wasm-simd-threaded.wasm",
// };

//Dev version
env.wasm.wasmPaths = {
    "ort-wasm.wasm": location.origin + "/js/ort-wasm.wasm",
    "ort-wasm-simd.wasm": location.origin + "/js/ort-wasm-simd.wasm",
    "ort-wasm-threaded.wasm": location.origin + "/js/ort-wasm-threaded.wasm",
    "ort-wasm-simd-threaded.wasm":
        location.origin + "/js/ort-wasm-simd-threaded.wasm",
};


let session: InferenceSession;
let webnnGpuSession: InferenceSession | undefined;
let webnnCpuSession: InferenceSession | undefined;
let sessionBackend: string;
let modelFile: ArrayBuffer;

async function init(message: { type: string; content: { sessionBackend: string; modelFile: ArrayBuffer; } }) {
    sessionBackend = message.content.sessionBackend;
    modelFile = message.content.modelFile;
    if (sessionBackend == "webnn_gpu") {
        if (webnnGpuSession) {
            await runModelUtils.setWebnnPolyfillBackend(1);
            session = webnnGpuSession;
            return
        }
    } else if (sessionBackend == "webnn_cpu") {
        if (webnnCpuSession) {
            await runModelUtils.setWebnnPolyfillBackend(2);
            session = webnnCpuSession;
            return
        }
    }
    try {
        if (sessionBackend === "webnn_gpu") {
            webnnGpuSession = await runModelUtils.createModelWebnn(modelFile, 1);
            session = webnnGpuSession;
        } else if (sessionBackend === "webnn_cpu") {
            webnnCpuSession = await runModelUtils.createModelWebnn(modelFile, 2);
            session = webnnCpuSession;
        }

    } catch (error) {
        if (sessionBackend === "webnn_gpu") {
            webnnGpuSession = undefined;
        } else if (sessionBackend === "webnn_cpu") {
            webnnCpuSession = undefined;
        }
        throw new Error("Error: Backend not supported. ");
    }

    return "Finished Initialzation";
}

async function run(message: { type: string, content: Tensor }) {
    return runModelUtils.runModel(session, message.content);
}


registerPromiseWorker(async (message) => {
    switch (message.type) {
        case "init":
            return init(message);
        case "run":
            return run(message);
        default:
            return;
    }
});

export default {} as typeof Worker & { new(): Worker };