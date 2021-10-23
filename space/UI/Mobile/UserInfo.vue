<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import IdCard from "/space/UI/Common/IdCard.vue";
import Button from "/space/UI/Common/Button.vue";
</script>

<template>
	<div Content style="padding-top: 0; padding-left: 0; padding-right: 0; background-color: var(--accent)">
		<IdCard :profile="data.profile" />
		<div
			style="
				display: flex;
				justify-content: center;
				align-items: center;
				flex-grow: 1;
				--button-margin: 0;
				--button-padding: 0.6em;
				margin: 1em 0;
				padding: var(--padding)
			"
		>
			<Button
				style="
					border-radius: 0.4em 0 0 0.4em;
					border: none;
					flex-grow: 1;
					width: 5em;
				"
				:type="type_default()"
				:name="intl({ 'en-US': 'default', 'zh-CN': '默认' })"
				@click="setLocaleOverride()"
			/>
			<Button
				:style="{
					'border-radius': 0,
					'border-top': 'none',
					'border-bottom': 'none',
					'border-left': '2px solid var(--gray-bright)',
					'border-right': '2px solid var(--gray-bright)',
					'flex-grow': 1,
					width: '5em',
				}"
				:type="type_CN()"
				name="中文"
				@click="setLocaleOverride('zh-CN')"
			/>
			<Button
				style="
					border-radius: 0 0.4em 0.4em 0;
					border: none;
					flex-grow: 1;
					width: 5em;
				"
				:type="type_EN()"
				name="English"
				@click="setLocaleOverride('en-US')"
			/>
		</div>
		<div
			style="display: flex; flex-direction: row; justify-content: center"
		>
			<Button
				type="solid red"
				:name="
					intl({
						'en-US': 'Log out',
						'zh-CN': '退出登录',
					})
				"
				@click="logout()"
			/>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { env, intl, setLocaleOverride } from '/util/env.js';

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
			_popup_: {
				ID: 0,
				show: false,
			},
			pend: false,
			data,
		};
	},
	methods: {
		intl,
		setLocaleOverride,
		logout() {
			Session.logout().then();
		},
		type_default() {
			return !env.localeOverride ? "gray solid" : "gray outlined";
		},
		type_EN() {
			return env.localeOverride && env.locale == "en-US"
				? "gray solid"
				: "gray outlined";
		},
		type_CN() {
			return env.localeOverride && env.locale == "zh-CN"
				? "gray solid"
				: "gray outlined";
		},
	},
	created() {
		// Force Update on language change
		env.on("update", () => {
			this.$forceUpdate();
		});
	},
};
</script>