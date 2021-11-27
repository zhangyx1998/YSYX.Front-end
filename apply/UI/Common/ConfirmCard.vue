<script setup>
import Badge from "/components/Badge.vue";
</script>

<template>
	<div Entry v-if="!Array.isArray(val) && !!val">
		<div EntryVal>
			<div title style="font-weight: 600; color: var(--accent)">
				<span en-US>{{ formData[attr]["en-US"] }}</span>
				<span zh-CN>{{ formData[attr]["zh-CN"] }}</span>
			</div>
			<div style="font-size: 1em; color: var(--gray-dark)">
				{{ typeof val == "string" ? val : val.name }}
			</div>
		</div>
	</div>
	<div Entry v-if="Array.isArray(val) && !!val">
		<div EntryVal>
			<div title style="font-weight: 600; color: var(--accent)">
				<span en-US>{{ formData[attr]["en-US"] }}</span>
				<span zh-CN>{{ formData[attr]["zh-CN"] }}</span>
			</div>
			<div style="font-size: 1em; color: var(--gray-dark); display: flex">
				<Badge
					v-for="(value, index) in val"
					:key="index"
					type="accent unselected"
					:name="intl(value)"
					style="
						font-size: 0.9em;
						opacity: 0.9;
						--badge-margin: 0 0.5em 0 0;
					"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>

<script>
import { intl } from "/util/env.js";
import { formData } from "/apply/formData.json";
export default {
	props: ["attr", "val"],
	data() {
		return {
			formData,
		};
	},
	methods: {
		intl,
	},
};
</script>
