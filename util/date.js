import { assert } from "./diagnostics.js";

export function monthShort(val) {
	val = parseInt(val);
	assert(val > 0 && val <= 12);
	return [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	][val - 1];
}

export function localeDate(val) {
	const date = new Date(val),
		dateOptions = {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		},
		todayDateStr = (new Date).toLocaleDateString(undefined, dateOptions),
		dateStr = date.toLocaleDateString(undefined, dateOptions),
		timeStr = date.toLocaleTimeString(undefined, {timeStyle: 'short'});
	return [(todayDateStr == dateStr ? 'Today' : dateStr), timeStr].join(', ');
}

export function timeZone() {
	return (new Date).getTimezoneOffset();
}