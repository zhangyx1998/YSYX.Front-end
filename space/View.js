import { withCtx } from '@vue/runtime-core';
import { Callable } from '/util/Callable.js';
export class Popup extends Callable {
	static get _name_() { return 'View.Popup'; }
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
		};
		this.call('change');
	}
}

export class AppView extends Callable {
	static get _name_() { return 'View.AppView'; }
	static #view = '';
	static #appList = {};
	static register(moduleName, module) {
		this.#appList[moduleName] = module;
	}
	static navigate(moduleName) {
		// if ()
	}
}

export class InfoBubble extends Callable {
	static #infoQueue = [];
	static get TIMEOUT() { return 3000; }
	static push(el) {
		// const 
	}
}