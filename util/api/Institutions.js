import { Search } from "../Search";

const API_BASE = 'http://api.ysyx.org:8100/institutions';
const API_CONF = { method: "GET" };
const cache = {};
async function SearchInstitutions(searchStr) {
	if (searchStr in cache) return await cache[searchStr];
	for (const cached in cache) {
		if (searchStr.includes(cached)) {
			return new Search({
				ID: { includes: searchStr },
				'name.*': { includes: searchStr }
			}, 'or').apply(await cache[cached])
		}
	}
	// Mark this entry as pending
	cache[searchStr] = fetch(`${API_BASE}/${encodeURIComponent(searchStr)}`, API_CONF)
		.then(res => res.json())
		.then(data => cache[searchStr] = data);
	// Initiate new API query
	return await cache[searchStr];
}

export default async function search(searchStr) {
	return SearchInstitutions(searchStr).then(result => Object.fromEntries(result.map(
		el => [el.ID, el.name]
	)))
}