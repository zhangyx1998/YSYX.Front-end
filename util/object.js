import { assert } from "./diagnostics.js";

/**
 * Tells if a given path exists in given object
 * Note that a 'null' value also resolves to 'true'
 * @param {object} obj 
 * @param {...string} paths 
 */
export function dig(obj, ...paths) {
	if (paths.length == 0) return true;
	else if (
		typeof obj !== 'object'
		|| obj === null
		|| !(paths[0] in obj)
	) return false;
	else return dig(obj[paths[0]], ...paths.slice(1));
}

/**
 * If path exists in given obj, return its value
 * Otherwise, return null
 * @param {object} obj 
 * @param {...string} paths 
 */
export function digVal(obj, ...paths) {
	if (paths.length == 0) return obj;
	else if (
		typeof obj !== 'object'
		|| obj === null
		|| !(paths[0] in obj)
	) return null;
	else return digVal(obj[paths[0]], ...paths.slice(1));
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