import { assert } from "./diagnostics.js";

/**
 * 
 * @param {object} obj 
 * @param {...string} paths 
 */
export function dig(obj, ...paths) {
	let path = paths.reverse(), subObj = obj;
	while (path.length > 0) {
		let dir = path.pop();
		assert(typeof dir === 'string', () => `expected path to be string, got ${typeof dir}`);
		if (dir in subObj) subObj = subObj[dir];
		else return false;
	}
	return true;
}

/**
 * 
 * @param {object} obj 
 * @param {...string} paths 
 */
export function digVal(obj, ...paths) {
	let path = paths.reverse(), subObj = obj;
	while (path.length > 0) {
		let dir = path.pop();
		assert(typeof dir === 'string', () => `expected path to be string, got ${typeof dir}`);
		if (dir in subObj) subObj = subObj[dir];
		else return null;
	}
	return subObj;
}

/**
 * 
 * @param {object} template 
 * @param {object} source 
 */
export function fill(template, source) {
	assert(
		typeof source === typeof template,
		'Type of source data should be same with template.'
	);
	if (typeof template !== 'object') {
		// Process basic value
		return source;
	} else if (Array.isArray(template)) {
		// Detect array
		assert(Array.isArray(source), 'Template element is an array, while source data is not');
		return source.map(el => el);
	} else {
		// Scan through entries
		const result = {};
		for (const entry in template) {
			if (entry in source) {
				// Math each sub-entry
				result[entry] = fill(template[entry], source[entry]);
			} else {
				// Use template
				result[entry] = template[entry];
			}
		}
		return Object.assign({}, result);
	}
}

export function setEntry(obj, path, val) {
	if (typeof path === 'string') path = [path];
	assert(Array.isArray(path) && path.length > 0);
	assert(typeof obj === 'object');
	const valName = path.pop();
	for (const name of path) {
		assert(typeof name === 'string');
		if (name in obj) {
			assert(typeof obj[name] === 'object');
		} else {
			obj[name] = {};
		}
		obj = obj[name];
	}
	obj[valName] = val;
}

export function unsetEntry(obj, path) {
	if (typeof path === 'string') path = [path];
	assert(Array.isArray(path) && path.length > 0);
	assert(typeof obj === 'object');
	const valName = path.pop();
	for (const name of path) {
		assert(typeof name === 'string');
		if (name in obj) {
			assert(typeof obj[name] === 'object');
		} else {
			obj[name] = {};
		}
		obj = obj[name];
	}
	delete obj[valName];
}