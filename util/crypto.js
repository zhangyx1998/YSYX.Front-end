import { sjcl } from './sjcl.js';
import { assert } from './diagnostics.js';
/**
 * Returns a pair of salted password string and its salt.
 * @param {string} password
 * @param {string} salt
 * @returns {object} keyPair 
 */
export function mix(password, salt) {
	assert(typeof password === 'string' && typeof salt === 'string');
	salt = salt.split('').reverse();
	return password.split('').map(c => c + (salt.length > 0 ? salt.pop() : '')).join('');
}
/**
 * Returns a sha256 string of given value
 * @param {string} val 
 * @returns {string}
 */
export function sha256(val) {
	assert(typeof val === 'string');
	return sjcl
		.codec
		.hex
		.fromBits(
			sjcl
				.hash
				.sha256
				.hash(val)
		)
}