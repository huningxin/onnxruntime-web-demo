// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {InferenceSession} from 'onnxruntime-common';

import {iterateExtraOptions} from './options-utils';
import {allocWasmString} from './string-utils';
import {getInstance} from './wasm-factory';

const getGraphOptimzationLevel = (graphOptimizationLevel: string|unknown): number => {
  switch (graphOptimizationLevel) {
    case 'disabled':
      return 0;
    case 'basic':
      return 1;
    case 'extended':
      return 2;
    case 'all':
      return 99;
    default:
      throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);
  }
};

const getExecutionMode = (executionMode: 'sequential'|'parallel'): number => {
  switch (executionMode) {
    case 'sequential':
      return 0;
    case 'parallel':
      return 1;
    default:
      throw new Error(`unsupported execution mode: ${executionMode}`);
  }
};

const appendDefaultOptions = (options: InferenceSession.SessionOptions): void => {
  if (!options.extra) {
    options.extra = {};
  }
  if (!options.extra.session) {
    options.extra.session = {};
  }
  const session = options.extra.session as Record<string, string>;
  if (!session.use_ort_model_bytes_directly) {
    // eslint-disable-next-line camelcase
    session.use_ort_model_bytes_directly = '1';
  }
};

export const setSessionOptions = (options?: InferenceSession.SessionOptions): [number, number[]] => {
  const wasm = getInstance();
  let sessionOptionsHandle = 0;
  const allocs: number[] = [];

  const sessionOptions: InferenceSession.SessionOptions = options || {};
  appendDefaultOptions(sessionOptions);

  try {
    if (options?.graphOptimizationLevel === undefined) {
      sessionOptions.graphOptimizationLevel = 'all';
    }
    const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel!);

    if (options?.enableCpuMemArena === undefined) {
      sessionOptions.enableCpuMemArena = true;
    }

    if (options?.enableMemPattern === undefined) {
      sessionOptions.enableMemPattern = true;
    }

    if (options?.executionMode === undefined) {
      sessionOptions.executionMode = 'sequential';
    }
    const executionMode = getExecutionMode(sessionOptions.executionMode!);

    let logIdDataOffset = 0;
    if (options?.logId !== undefined) {
      logIdDataOffset = allocWasmString(options.logId, allocs);
    }

    if (options?.logSeverityLevel === undefined) {
      sessionOptions.logSeverityLevel = 2;  // Default to warning
    } else if (
        typeof options.logSeverityLevel !== 'number' || !Number.isInteger(options.logSeverityLevel) ||
        options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {
      throw new Error(`log serverity level is not valid: ${options.logSeverityLevel}`);
    }

    if (options?.logVerbosityLevel === undefined) {
      sessionOptions.logVerbosityLevel = 0;  // Default to 0
    } else if (typeof options.logVerbosityLevel !== 'number' || !Number.isInteger(options.logVerbosityLevel)) {
      throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);
    }

    if (options?.enableProfiling === undefined) {
      sessionOptions.enableProfiling = false;
    }

    sessionOptionsHandle = wasm._OrtCreateSessionOptions(
        graphOptimizationLevel, !!sessionOptions.enableCpuMemArena!, !!sessionOptions.enableMemPattern!, executionMode,
        !!sessionOptions.enableProfiling!, 0, logIdDataOffset, sessionOptions.logSeverityLevel!,
        sessionOptions.logVerbosityLevel!);
    if (sessionOptionsHandle === 0) {
      throw new Error('Can\'t create session options');
    }

    if (options?.extra !== undefined) {
      iterateExtraOptions(options.extra, '', new WeakSet<Record<string, unknown>>(), (key, value) => {
        const keyDataOffset = allocWasmString(key, allocs);
        const valueDataOffset = allocWasmString(value, allocs);

        if (wasm._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
          throw new Error(`Can't set a session config entry: ${key} - ${value}`);
        }
      });
    }

    if (options?.executionProviders) {
      for (const ep of options.executionProviders) {
        const name = typeof ep === 'string' ? ep : ep.name;
        if (name === 'webnn') {
          let devicePreference = 0;
          let powerPreference = 0;
          if (typeof ep !== 'string') {
            const webnnOptions = ep as InferenceSession.WebNNExecutionProviderOption;
            if (webnnOptions?.devicePreference) {
              devicePreference = webnnOptions.devicePreference;
            }
            if (webnnOptions?.powerPreference) {
              powerPreference = webnnOptions.powerPreference;
            }
          }
          const preferenceValues = [0, 1, 2];
          if (!preferenceValues.includes(devicePreference)) {
            throw new Error("Invalid devicePerference value, it shoule be one of {0, 1, 2}");
          }
          if (!preferenceValues.includes(powerPreference)) {
            throw new Error("Invalid powerPreference value, it shoule be one of {0, 1, 2}");
          }
          const devicePreferenceNames = ["Default", "GPU", "CPU"];
          const powerPreferenceNames = ["Default", "High-performance", "Low-power"];
          console.log(`webnn device preference: ${devicePreferenceNames[devicePreference]}`);
          console.log(`webnn power preference: ${powerPreferenceNames[powerPreference]}`);
          if (wasm._OrtSessionOptionsAppendExecutionProviderWebNN(sessionOptionsHandle, devicePreference, powerPreference) !== 0) {
            throw new Error(`Can't append WebNN execution provider`);
          }
          break;
        }
      }
    }

    return [sessionOptionsHandle, allocs];
  } catch (e) {
    if (sessionOptionsHandle !== 0) {
      wasm._OrtReleaseSessionOptions(sessionOptionsHandle);
    }
    allocs.forEach(wasm._free);
    throw e;
  }
};
