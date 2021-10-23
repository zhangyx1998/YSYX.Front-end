import { assert } from "./diagnostics.js";
import { env, intl } from "./env.js";

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

export function localeDate(stamp) {
	const date = new Date(stamp),
		now = new Date,
		offset = (Date.now() - stamp) / (24 * 60 * 60_000),
		timeStr = date.toLocaleTimeString(env.locale, { timeStyle: 'short' }),
		dateNumeric = {}, nowNumeric = {};
	let options = {};
	for (const el in numeric) {
		dateNumeric[el] = numeric[el](date);
		nowNumeric[el] = numeric[el](now);
	}
	let weekdayDifference = (7 + nowNumeric.weekday - dateNumeric.weekday) % 7;
	if (offset < 1 && !weekdayDifference) {
		return `${intl({
			'en-US': 'Today',
			'zh-CN': '今天'
		})} ${timeStr}`;
	}
	else if (offset < 7 && weekdayDifference) {
		if (weekdayDifference == 1) {
			return `${intl({
				'en-US': 'Yesterday',
				'zh-CN': '昨天'
			})} ${timeStr}`;
		} else if (weekdayDifference <= 3) {
			return `${weekdayDifference}${intl({
				'en-US': ' days ago',
				'zh-CN': '天前'
			})} ${timeStr}`;
		} else {
			options.weekday = "long";
		}
	} else if (dateNumeric.year == nowNumeric.year) {
		options = {
			month: "short",
			day: "numeric"
		}
	} else {
		options = {
			year: "numeric",
			month: "short",
			day: "numeric"
		}
	}
	return [date.toLocaleDateString(env.locale, options), timeStr].join(', ');
}

const numeric = {
	weekday(date) {
		return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(dateVal({ weekday: "short" }, date)) + 1;
	},
	year(date) {
		return parseInt(dateVal({ year: "numeric" }, date));
	},
	month(date) {
		return parseInt(dateVal({ month: "numeric" }, date));
	},
	day(date) {
		return parseInt(dateVal({ day: "numeric" }, date));
	}
}

function dateVal(options, date) {
	return date.toLocaleDateString('en-US', options)
}

export function timeZone() {
	return (new Date).getTimezoneOffset();
}