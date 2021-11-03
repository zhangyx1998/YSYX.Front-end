import { assert } from "./diagnostics.js";
import { digVal } from "./object.js";

const RELATIONS = ['AND', 'OR', 'XOR'];

export class Search {
	#filters = {};
	#relation;
	constructor(filters = {}, relation = "and") {
		this.#relation = RELATIONS.indexOf(relation.toUpperCase());
		if (this.#relation < 0) throw new Error(`Invalid relation: ${relation}`);
		for (const entry in filters) {
			this.#filters[entry] = new Filter(filters[entry]);
		}
	}

	apply(list) {
		assert(Array.isArray(list));
		return list.filter(el => this.test(el));
	}

	test(entry) {
		return Object
			.entries(this.#filters)
			.map(([entryName, filter]) => filter.apply(
				digVal(entry, ...entryName.split('.'))
			))
			.reduce([
				(x, y) => x && y,
				(x, y) => x || y,
				(x, y) => x ^ y
			][this.#relation]);
	}

	get sqlQuery() {
		return Object
			.entries(this.#filters)
			.map(([entryName, filter]) => {
				const query = filter.sqlQuery;
				if (typeof query === 'string')
					return `\`${entryName}\` ${query}`;
				else
					return ''
			})
			.filter(str => !!str)
			.join(` ${RELATIONS[this.#relation]} `);
	}
}

class Filter {
	#regex;
	#equals;
	#includes;
	constructor(args) {
		const { regex, equals, includes } = typeof args === 'object'
			? args
			: { equals: args };
		if (regex !== undefined)
			try {
				this.#regex = new RegExp(regex);
			} catch (e) {
				console.error(this, e.stack);
			}
		if (equals !== undefined) {
			if (typeof equals === 'object' || typeof equals === 'function')
				console.error(this, `'equals' does not support type '${typeof equals}'`);
			else
				this.#equals = equals;
		}
		if (includes !== undefined) {
			if (typeof includes === 'string')
				this.#includes = includes.split(' ');
			else if (Array.isArray(includes))
				this.#includes = includes.filter(el => (typeof el === 'string'));
			else
				console.error(this, `'includes' accepts only string or array of string`);
		}
	}

	apply(value) {
		if (Array.isArray(value)) {
			return value.map(el => this.apply(el)).reduce((a, b) => a || b);
		}
		if (typeof value !== 'string') return false;
		if (this.#regex instanceof RegExp && !this.#regex.test(value)) {
			return false;
		}
		if (this.#equals !== undefined && this.#equals !== value)
			return false;
		if (Array.isArray(this.#includes)) {
			return this.#includes
				.map(str => value.toLowerCase().includes(str.toLowerCase()))
				.reduce((a, b) => a && b, true);
		}
		return true;
	}

	get sqlQuery() {
		if (this.#regex !== undefined) return `REGEXP '${this.#regex.toString()}'`;
		if (this.#includes !== undefined) return `LIKE '%${this.#includes}%'`;
		if (this.#equals !== undefined) return `= ${JSON.stringify(this.#equals)}`;
		return undefined;
	}
}