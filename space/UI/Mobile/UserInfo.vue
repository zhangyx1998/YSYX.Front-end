<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import Button from "/space/UI/Common/Button.vue";
</script>

<template>
	<p v-for="(val, entry) in data.Profile" :key="entry">
		{{ entry }} : {{ val }}
	</p>
	<div
		style="
			display: flex;
			justify-content: center;
			align-items: center;
			flex-grow: 1;
			--button-margin: 0;
			--button-padding: 0.8em;
			margin: 1em 0;
		"
	>
		<!-- <span style="margin-right: 0.6em">
					<h4 zh-CN>语言</h4>
					<h4 en-US>Language</h4>
				</span> -->
		<Button
			style="border-radius: 0.4em 0 0 0.4em; border: none; flex-grow: 1; width: 5em;"
			:type="type_default()"
			:name="{ 'en-US': 'default', 'zh-CN': '默认' }[locale.$]"
			@click="locale.unsetOverride()"
		/>
		<Button
			:style="{
				'border-radius': 0,
				'border': 'none',
				'border-color': 'var(--gray-brighter)',
				'border-left': '2px inset',
				'border-right': '2px inset',
				'flex-grow': 1,
				'width': '5em'
			}"
			:type="type_CN()"
			name="中文"
			@click="locale.setOverride('zh-CN')"
		/>
		<Button
			style="border-radius: 0 0.4em 0.4em 0; border: none; flex-grow: 1; width: 5em;"
			:type="type_EN()"
			name="English"
			@click="locale.setOverride('en-US')"
		/>
	</div>
	<div style="display: flex; flex-direction: row; justify-content: center">
		<Button
			type="solid red"
			:name="
				{
					'en-US': 'Log out',
					'zh-CN': '退出登录',
				}[locale.$]
			"
			@click="logout()"
		/>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { locale, Locale } from "/util/locale.js";

const data = {
	Profile: null,
};
// Data management
Session.on("Profile", (Profile) => {
	data.Profile = Profile;
});

export default {
	emits: ["show-pane", "close-pane"],
	data() {
		return {
			locale,
			_popup_: {
				ID: 0,
				show: false,
			},
			pend: false,
			data,
		};
	},
	methods: {
		logout() {
			Session.logout().then();
		},
		type_default() {
			return !locale.override ? "gray solid" : "gray outlined";
		},
		type_EN() {
			return locale.override && locale.$ == "en-US"
				? "gray solid"
				: "gray outlined";
		},
		type_CN() {
			return locale.override && locale.$ == "zh-CN"
				? "gray solid"
				: "gray outlined";
		},
	},
	created() {
		// Force Update on language change
		Locale.on("update", () => {
			this.$forceUpdate();
		});
	},
};
</script>