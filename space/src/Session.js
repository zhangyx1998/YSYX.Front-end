import { assert } from '/util/diagnostics';
import { sha256 } from '/util/crypto.js'
import { digVal } from '/util/object.js';

export class Session {
	static data = {
		login: false,
		ID: '',
		Profile: {},
		Module: {},
		UI: {}
	};
	// Session maintenance
	static login(ID, password) {
		return Session
			.post('login', { ID: ID, password: sha256(ID + password) })
			.then(res => res.json())
			.then(res => {
				if (digVal(res, 'login')) {
					Session.data.ID = ID;
					Session.call('login');
				} else {
					Session.data.ID = '';
					Session.call('logout');
				}
			});
	}
	// Convenience API
	static post(path, data) {
		if (path[0] === '/') path = path.slice(1);
		switch (typeof data) {
			case 'string':
				data = { body: data };
				break;
			case 'object':
				data = { body: JSON.stringify(data) };
				break;
			default:
				try {
					data = { body: data.toString() };
				} catch (e) {
					data = {};
				}
		}
		return fetch(`/api/${path}`, {
			method: 'POST',
			credentials: "include",
			...data
		})
		// .then(res => {
		// 	try {
		// 		let data = JSON.parse(res.body);
		// 		if ('login' in data && data.login === false) {
		// 			Session.call('logout');
		// 		}
		// 	} catch (e) {}
		// 	// Pass down resolution
		// 	return res;
		// })
	}
	// callback handler
	static #callback = {};
	/**
	 * Register a new callback fn
	 * @param {string} event 
	 * @param {function} callback 
	 */
	static on(event, callback) {
		event = event.toLowerCase();
		if (event in this.#callback) {
			assert(Array.isArray(this.#callback[event]));
			this.#callback[event].push(callback);
		} else {
			this.#callback[event] = [callback];
		}
	}
	/**
	 * Dispatch a event specified by event.
	 * @param {string} event 
	 * @param  {...any} args 
	 */
	static call(event, ...args) {
		event = event.toLowerCase();
		console.log(`[Session] event '${event}' dispatched.`);
		if (event in this.#callback) {
			for (const callback of this.#callback[event]) {
				try {
					callback(...args);
				} catch (e) {
					console.log(`[Session callback] ${e}`);
				}
			}
		}
	}
}

Session.on('init', () => {
	Session
		.post('state')
		.then(res => res.json())
		.then(({ login }) => {
			Session.call(login ? 'login' : 'logout')
		}
		);
});

Session.on('login', () => {
	Session.login = true;
	Session
		.post('UserProfile')
		.then(res => res.json())
		.then(res => {
			Session.call('Profile', res);
		})
});

Session.on('logout', () => {
	Session.login = false;
});


Session.on('Profile', data => {
	console.log(data)
	Session.data.Profile = Object.assign({}, data);
});