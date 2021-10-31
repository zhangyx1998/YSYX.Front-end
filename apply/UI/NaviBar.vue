<script setup>
import Responsive from "/components/Responsive.vue";
import Button from "/components/Button.vue";
defineProps({
	back: Boolean,
	forward: Boolean,
	valid: Boolean,
});
</script>

<template>
	<div NaviBar style="--button-margin: 0 var(--padding)">
		<Button
			v-if="back"
			type="outlined gray"
			style="opacity: 0.8"
			:name="
				{
					'en-US': 'Previous',
					'zh-CN': '返回',
				}[locale.$]
			"
			@click="$emit('back')"
		/>
		<span v-else></span>
		<Button
			v-if="forward"
			:type="['solid', 'green', valid ? '' : 'disabled'].join(' ')"
			:name="
				{
					'en-US': 'Next',
					'zh-CN': '下一步',
				}[locale.$]
			"
			@click="$emit('forward')"
			style="flex-grow: 1"
		/>
		<Button
			v-if="!forward"
			:type="['solid', 'blue', valid ? '' : 'disabled'].join(' ')"
			:name="
				{
					'en-US': 'Confirm and Submit',
					'zh-CN': '确认并提交',
				}[locale.$]
			"
			@click="$emit('submit')"
			style="flex-grow: 1"
		/>
	</div>
</template>

<script>
import { locale } from "/util/locale.js";

export default {
	emits: ["forward", "back", "submit"],
	data() {
		return {
			locale,
		};
	},
};
</script>

<style scoped>
[NaviBar] {
	/* Positioning */
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: var(--mobile-navibar-height);
	/* Appearance */
	background-color: white;
	border-top: 0.06em solid var(--gray-brighter);
	/* Layout */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

[NaviBar] > * {
	max-width: 30vw;
}
</style>