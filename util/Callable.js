/**
 * Abstract Class that defines .on() and .call() 
 */
export class Callable {
	// callback handler
	static $callback = {};
	/**
	 * Register a new callback fn
	 * @param {string} event 
	 * @param {function} callback 
	 */
	static on(event, callback) {
		if (Array.isArray(event)) {
			event.forEach(e => Session.on(e, callback));
		} else {
			event = event.toLowerCase();
			if (event in this.$callback) {
				this.$callback[event].push(callback);
			} else {
				this.$callback[event] = [callback];
			}
		}
		return this;
	}
	/**
	 * Dispatch a event specified by event.
	 * @param {string} event 
	 * @param  {...any} args 
	 */
	static call(event, ...args) {
		event = event.toLowerCase();
		console.log(`[${this._name_ || 'Callable'}] event '${event}' dispatched.`);
		if (event == 'logout') console.log(new Error);
		if (event in this.$callback) {
			for (const callback of this.$callback[event]) {
				try {
					callback(...args);
				} catch (e) {
					console.log(`[${this._name_ || 'Callable'} callback] Error calling ${event}`);
					console.log(e.stack);
				}
			}
		}
		return this;
	}
}