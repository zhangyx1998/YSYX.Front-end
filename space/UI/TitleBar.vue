<script setup>
import Button from "./Common/Button.vue";
import { Session } from "/space/src/Session.js";
import { digVal } from "/util/object.js"
Session.on('UserProfile', ({Name}) => {
	this.name = Name;
})
defineProps({
	login: Boolean,
	ID: String,
	Profile: Object,
});
function alert(info) { window.alert(info); }
</script>

<template>
	<div id="TitleBar" class="UI-Top">
		<img src="/res/YSYX.png" style="height: 1.2em; margin-right: 0" />
		<span
			style="
				margin: 0 0.8em;
				height: 60%;
				width: 1px;
				background-color: var(--gray);
				opacity: 0.5;
			"
		></span>
		<span style="margin-left: 0; display: flex; color: var(--accent-dark)">
			<span zh-cn>个人空间</span>
			<span en-us>User Space</span>
		</span>
		<span style="flex-grow: 1"></span>
		<Button
			type="seamless"
			icon="codicon codicon-account"
			:name="digVal(Profile, 'Name') || ID"
			@click="alert('great!')"
		/>
	</div>
</template>

<style>
#TitleBar {
	box-sizing: border-box;
	/* Positioning */
	left: 0;
	top: 0;
	width: 100vw;
	height: var(--TitleBarHeight);
	/* Layout */
	display: flex;
	align-items: center;
	padding: 0 var(--Padding);
	/* Appearance */
	font-size: 1.2em;
	border-bottom: 1px solid #cccccc;
}
</style>
