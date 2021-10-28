import { digVal } from './object.js';
import { assert } from './diagnostics.js';
import { Callable } from './Callable.js';

function localeFallback(locale) {
	if (/zh\-\w{2}/.test(locale)) locale = "zh-CN";
	if (fallbackList.indexOf(locale) >= 0) {
		return locale;
	} else {
		// Fall back language
		return fallbackList[0];
	}
}

const fallbackList = ['en-US', 'zh-CN'];

export class Locale extends Callable {
	static get _name_() { return 'locale'; };
	get #native() {
		return navigator.language;
	};
	// Override 
	get #override() {
	const _locale_override_
			= /_locale_override_\s*=\s*(?<$>[a-zA-Z\-_0-9]+)/
				.exec(document.cookie);
		return digVal(_locale_override_, 'groups', '$') || '';
	};
	// The locale element, might be made responsive by Vue
	$ = '';
	override = '';
	title = '';
	constructor({ title }) {
		super();
		this.title = title;
		this.update();
	}
	// Update $
	update() {
		this.$ = localeFallback((this.override = this.#override) || this.#native);
		if (this.$ in this.title) {
			document.title = this.title[this.$];
		}
		Locale.call('update');
	}
	// Set override locale
	setOverride(localeName) {
		assert(typeof localeName === 'string' && (localeName = localeName.trim()).length > 0);
		document.cookie = [
			`_locale_override_=${localeName}`,
			'path=/',
			'domain=ysyx.org'
		].join(';');
		this.update();
	}
	// Unset override locale
	unsetOverride() {
		document.cookie = [
			`_locale_override_=`,
			'path=/',
			'domain=ysyx.org',
			`expires=${new Date(0).toUTCString()}`
		].join(';');
		this.update();
	}
	// locale selector
	_(doc) {
		if (typeof doc === 'object' && doc !== null) {
			// Try use declared doc
			if (this.$ in doc) return doc[this.$];
			// Fallback to language in fallbackList:
			for (const locale in fallbackList) {
				if (locale in doc && (typeof doc[locale] === 'string'))
					return doc[locale]; 
			}
			// Fallback to anythin available in doc input 
			for (const locale in doc) {
				if (typeof doc[locale] === 'string') return doc[locale];
			}
		}
		return this._({
			'en-US': 'illegal locale document input',
			'zh-CN': '非法的多语言文本输入'
		});
	}
}

export const locale = window.locale = new Locale({
	title: {
		'zh-CN': "个人空间",
		'en-US': "User Space",
	}
});