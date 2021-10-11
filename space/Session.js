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
	// Language
	static language = 'en-US';
	// Session maintenance
	static login(ID, password) {
		return Session
			.post('login', { ID: ID, password: sha256(ID + password) }, { logoutAction: () => { } })
			.then((res) => {
				if (digVal(res, 'login')) {
					Session.call('login', res);
				}
				return res;
			});
	}
	static logout() {
		return Session
			.post('logout', {}, { logoutAction: () => { } })
			.then((res) => {
				if (digVal(res, 'login') === false) {
					Session.call('logout', res);
				}
				return res;
			});
	}
	// Convenience API
	static post(path, data, args = {}) {
		const {
			expect = "JSON",
			logoutAction = () => {
				Session.call('logout');
				throw new Error('Session expired, please login to proceed.');
			}
		} = args;
		if (path[0] === '/') path = path.slice(1);
		switch (typeof data) {
			case 'string':
				data = { body: data };
				break;
			case 'object':
				if (Object.keys(data))
					data = { body: JSON.stringify(data) };
				else
					data = {};
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
			.then(res => {
				switch (expect.toUpperCase()) {
					case "JSON":
						return res.json().then(data => {
							if (digVal(data, 'login') === false) {
								logoutAction();
							}
							return data;
						})
					case "TEXT":
						return res.text();
					default:
						return res;
				}
			})
	}
}

Session.on('init', () => {
	Session
		.post('state', {}, { logoutAction: () => { } })
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