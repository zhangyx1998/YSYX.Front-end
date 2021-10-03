import { sha256 } from '/util/crypto.js'
import { digVal } from '/util/object.js';
import { Callable } from '/util/Callable.js';

export class Session extends Callable {
	static get _name_() { return 'Session'; }
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
					Session.call('login', res);
				} else {
					Session.call('logout');
				}
				return res;
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
}

Session.on('init', () => {
	Session
		.post('state')
		.then(res => res.json())
		.then(res => {
			const { login } = res;
			Session.call(login ? 'login' : 'logout', res);
		});
});

Session.on('login', ({ ID }) => {
	Session.data.ID = ID;
	Session.data.login = true;
	Session
		.post('UserProfile')
		.then(res => res.json())
		.then(res => {
			Session.call('Profile', res);
		})
});

Session.on('logout', () => {
	Session.data.login = false;
	Session.data.ID = '';
	Session.data.Profile = {};
	Session.call('Profile', {});
});