<script setup>
import Button from "/components/Button.vue";
</script>

<template>
	<div TitleBar UI-Top>
		<img src="/res/YSYX.png" style="height: 1.2em; margin-right: 0" />
		<span
			style="
				margin: 0 0.8em;
				height: 60%;
				width: 1.4px;
				background-color: var(--gray-bright);
			"
		></span>
		<span
			style="
				margin-left: 0;
				display: flex;
				color: var(--gray);
				font-weight: 400;
			"
		>
			<span zh-CN>个人空间</span>
			<span en-US>User Space</span>
		</span>
		<span style="flex-grow: 1"></span>
		<Button
			type="seamless"
			icon="codicon codicon-account"
			:name="displayName()"
			@click="Popup.call('UserProfile')"
		/>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Popup, DesktopView } from "/space/View.js";
export default {
	data() {
		return {
			ID: "",
			Name: "",
		};
	},
	methods: {
		displayName() {
			return this.Name || this.ID || "N/A";
		},
	},
	created() {
		Session.on("Profile", ({ Name }) => {
			this.Name = Name ? Name : "";
			this.ID = Session.ID;
		});
	},
	activated() {
		console.log(this);
	}
};
</script>

<style scoped>
div[TitleBar] {
	box-sizing: border-box;
	/* Positioning */
	left: 0;
	top: 0;
	width: 100vw;
	height: var(--TitleBarHeight);
	/* Layout */
	display: flex;
	align-items: center;
	padding: 0 var(--padding);
	/* Appearance */
	font-size: 1.2em;
	border-bottom: 1px solid #cccccc;
}
</style>
