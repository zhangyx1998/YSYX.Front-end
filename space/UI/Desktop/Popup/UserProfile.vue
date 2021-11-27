<script setup>
import Button from "/components/Button.vue";
</script>

<template>
	<div Login class="popup" v-if="_popup_.show">
		<div class="_popup_warper_">
			<h2 en-US>My Profile</h2>
			<h2 zh-CN>我的信息</h2>
			<p v-for="(val, el) in Profile" :key="el">{{ el }}: {{ val }}</p>
			<div
				style="
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 0.9em;
					--button-margin: 0;
				"
			>
				<!-- <span style="margin-right: 0.6em">
					<h4 zh-CN>语言</h4>
					<h4 en-US>Language</h4>
				</span> -->
				<Button
					style="border-radius: 0.4em 0 0 0.4em; border: none"
					:type="type_default()"
					:name="intl({ 'en-US': 'default', 'zh-CN': '默认' })"
					@click="setLocaleOverride()"
				/>
				<Button
					style="border-radius: 0; border: none"
					:type="type_CN()"
					name="中文"
					@click="setLocaleOverride('zh-CN')"
				/>
				<Button
					style="border-radius: 0 0.4em 0.4em 0; border: none"
					:type="type_EN()"
					name="English"
					@click="setLocaleOverride('en-US')"
				/>
			</div>
			<div style="display: flex; justify-content: end; font-size: 0.9em">
				<Button type="link" name="close" @click="Popup.close(this)" />
				<span style="flex-grow: 1"></span>
				<Button
					type="solid red"
					:name="
						intl({
							'en-US': 'Sign out',
							'zh-CN': '退出登录',
						})
					"
					@click="logout()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Popup, DesktopView } from "/space/View.js";
import { env, intl, setLocaleOverride } from '/util/env.js';
export default {
	data() {
		return {
			env,
			_popup_: {
				ID: 0,
				show: false,
			},
			pend: false,
			Profile: {},
		};
	},
	methods: {
		intl,
		setLocaleOverride,
		logout() {
			Popup.close(this);
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
		// Window management
		Popup.register(this);
		Popup.on("UserProfile", () => Popup.show(this));
		// Data management
		Session.on("Profile", (Profile) => {
			this.Profile = Profile;
		});
		// Force Update on language change
		env.on("update", () => {
			this.$forceUpdate();
		});
	},
	activated() {
		console.log(this);
	}
};
</script>

<style scoped>
</style>