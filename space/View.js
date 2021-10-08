import { withCtx } from '@vue/runtime-core';
import { Callable } from '/util/Callable.js';
export class Popup extends Callable {
	static get _name_() { return 'Popup'; }
	static #stack = [];
	static get ID() {
		if (this.#stack.length > 0)
			return this.#stack[this.#stack.length - 1];
		else
			return 0;
	}
	/**
	 * @returns {number} ID
	 */
	static show({ _popup_ }) {
		this.#stack.push(_popup_.ID);
		this.update();
	}
	static close({ _popup_ }) {
		if (this.ID === _popup_.ID)
			this.#stack.pop();
		else
			throw new Error('Popup close() mismatch');
		this.update();
	}
	/**
	 * Registering Popup Instances
	 */
	static #list = [];
	static register({ _popup_ }) {
		this.#list.push(_popup_);
		_popup_.ID = this.#list.length;
	}
	static update() {
		const ID = this.ID;
		for (const el of this.#list) {
			el.show = el.ID === ID;
		}
	}
}

export class AppView extends Callable {
	static get _name_() { return 'View.App'; }
	static #view = '';
	// static set module(module) {
	// 	this.#module = module;
	// 	this.call('viewChange', this.module);
	// }
	// static get module() { return this.#module; }
	// History API
	// static stepForward(path) {
	// 	;
	// }
}