<script setup>
import MobileTitleBar from "../TitleBar.vue";
import Responsive from "/components//Responsive.vue";
import Button from "/components//Button.vue";
</script>

<template>
	<MobileTitleBar
		:title="intl({ 'zh-CN': '设置语言', 'en-US': 'Set Language' })"
		animation="opacity"
	>
	</MobileTitleBar>
	<div ContentView>
		<div content style="background-color: var(--accent)">
			<Responsive
				lighter
				:class="[
					'card flat-round white',
					!env.localeOverride ? 'selected' : '',
				]"
				tabindex="0"
				@click="setLocaleOverride()"
			>
				<div title>
					<span class="large">{{
						intl({ "en-US": "Default", "zh-CN": "默认" })
					}}</span>
				</div>
				<div content>
					<span en-US>Follow system settings</span>
					<span zh-CN>跟随系统设置</span>
				</div>
			</Responsive>
			<Responsive
				lighter
				:class="[
					'card flat-round white',
					env.localeOverride && env.locale == 'zh-CN'
						? 'selected'
						: '',
				]"
				tabindex="0"
				@click="setLocaleOverride('zh-CN')"
			>
				<div title>
					<span class="large">中文</span>
				</div>
			</Responsive>
			<Responsive
				lighter
				:class="[
					'card flat-round white',
					env.localeOverride && env.locale == 'en-US'
						? 'selected'
						: '',
				]"
				tabindex="0"
				@click="setLocaleOverride('en-US')"
			>
				<div title>
					<span class="large">English</span>
				</div>
			</Responsive>
			<div
				style="
					display: flex;
					justify-content: center;
					align-items: center;
					padding: var(--padding);
				"
			>
				<Button
					type="outlined white"
					style="--button-padding: 0.6em 2em"
					:name="intl({ 'zh-CN': '取消', 'en-US': 'Cancel' })"
					@click="setLocaleOverride(previous); this.$emit('back');"
				/>
				<Button
					type="solid green"
					style="--button-padding: 0.6em 2em"
					:name="intl({ 'zh-CN': '确认', 'en-US': 'Confirm' })"
					@click="this.$emit('back');"
				/>
			</div>
		</div>
	</div>
</template>
 
<script>
import { env, intl, setLocaleOverride } from "/util/env.js";
export default {
	emits: ["show-pane", "back"],
	data() {
		return {
			env,
			previous: undefined
		};
	},
	methods: {
		intl,
		setLocaleOverride
	},
	mounted() {
		env.on("update", this.$forceUpdate);
	},
	activated() {
		this.previous = env.localeOverride ? env.locale : undefined;
	}
};
</script>

<style scoped>
.card {
	font-size: 0.8em;
	margin: 2em 0;
	padding: 0;
	background-color: var(--white-background);
	transition: var(--animation-duration) var(--animation-curve);
}

.card:not(.selected) {
	border-color: transparent;
	opacity: 0.6;
}
</style>