<script setup>
import Button from "../Common/Button.vue";
</script>

<template>
	<div Login class="popup" v-if="_popup_.show">
		<div class="_popup_warper_">
			<h2 en-US>My Profile</h2>
			<h2 zh-CN>我的信息</h2>
			<p v-for="(val, el) in Profile" :key="el">
				{{ el }}: {{ val }}
			</p>
			<div style="display: flex; justify-content: end; font-size: 0.9em">
				<Button
					type="link"
					name="close"
					@click="Popup.close(this)"
				/>
				<span style="flex-grow: 1"></span>
				<Button
					type="colored red"
					name="Logout"
					@click="logout()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Popup, AppView } from "/space/View.js";
export default {
	data() {
		return {
			_popup_: {
				ID: 0,
				show: false,
			},
			pend: false,
			Profile: {},
		};
	},
	methods: {
		logout() {
			Popup.close(this);
			Session.logout().then();
		},
	},
	created() {
		// Window management
		window.UserProfilePopup = this;
		Popup.register(this);
		Popup.on("UserProfile", () => Popup.show(this));
		// Data management
		Session.on("Profile", (Profile) => {
			this.Profile = Profile;
		});
	},
};
</script>

<style scoped>
</style>