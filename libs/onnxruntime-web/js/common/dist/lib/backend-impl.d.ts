import { Backend } from './backend';
/**
 * Register a backend.
 *
 * @param name - the name as a key to lookup as an execution provider.
 * @param backend - the backend object.
 * @param priority - an integer indicating the priority of the backend. Higher number means higher priority.
 */
export declare const registerBackend: (name: string, backend: Backend, priority: number) => void;
/**
 * Resolve backend by specified hints.
 *
 * @param backendHints - a list of execution provider names to lookup. If omitted use registered backends as list.
 * @returns a promise that resolves to the backend.
 */
export declare const resolveBackend: (backendHints: readonly string[]) => Promise<Backend>;
