<script setup>
import Responsive from "/components/Responsive.vue";
import Button from "/components/Button.vue";
import popup from "./Common/popup.vue";
defineProps({
	back: Boolean,
	forward: Boolean,
	valid: Boolean,
	submitData: Object,
});
</script>

<template>
	<div>
		<div NaviBar style="--button-margin: 0 var(--padding)">
			<Button
				v-if="back"
				type="outlined gray"
				style="opacity: 0.8"
				:name="
					intl({
						'en-US': 'Previous',
						'zh-CN': '返回',
					})
				"
				@click="$emit('back')"
			/>
			<span v-else></span>
			<Button
				v-if="forward"
				:type="['solid', 'green', valid ? '' : 'disabled'].join(' ')"
				:name="
					intl({
						'en-US': 'Next',
						'zh-CN': '下一步',
					})
				"
				@click="
					/* $parent
					.mailCellExist('mailCellExist')
					.then((res) => res.json())
					.then((data) => {
						if (data.valid === true) {
							alertSomething('邮箱或电话已被使用，请检查后输入');
						} else { */
					$emit('forward')
					/* }
					}) */
				"
				style="flex-grow: 1"
			/>
			<Button
				v-if="!forward"
				:type="['solid', 'blue', valid ? '' : 'disabled'].join(' ')"
				:name="
					intl({
						'en-US': 'Submit',
						'zh-CN': '确认并提交',
					})
				"
				@click="$emit('submit'), popUp()"
				style="flex-grow: 1"
			/>
		</div>
		<popup ref="pop" :submitData="submitData"></popup>
	</div>
</template>

<script>
import { locale } from "/util/locale.js";
import { intl } from "/util/env.js";
export default {
	emits: ["forward", "back", "submit", "mailCellExist"],
	data() {
		return {
			locale,
		};
	},
	methods: {
		popUp() {
			this.$refs.pop.popShow = !this.$refs.pop.popShow;
		},
		intl,
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