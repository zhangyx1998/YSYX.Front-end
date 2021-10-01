// Diagnostics utility
// Write to main log file
export class AssertionError extends Error {};
/**
 * If condition is NOT true, throws an error.
 * @param {boolean} condition true for a successful assertion, false otherwise
 * @param {*} message error message if assert failed
 */
 export function assert(condition = false, message = 'Assert Failed') {
	if (condition !== true) throw new AssertionError(typeof message === 'function' ? message() : message);
}