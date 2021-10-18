<script setup>
// Top level UI components
import TitleBar from "./Desktop/TitleBar.vue";
import SideBar from "./Desktop/SideBar.vue";
// Popup components
import Login from "./Desktop/Popup/Login.vue";
import UserProfile from "./Desktop/Popup/UserProfile.vue";
import PopupMask from "./Desktop/Popup/mask.vue";
// Application module components
import Container from "./Desktop/Container.vue";
</script>

<template>
	<!-- Popups -->
	<Login />
	<UserProfile />
	<PopupMask v-if="popupMask" />
	<!-- Top-level UI components -->
	<TitleBar />
	<SideBar />
	<!-- Container -->
	<Container />
</template>

<script>
import { Popup, DesktopView } from "/space/View.js";
import { Session } from "/space/Session.js";

export default {
	data() {
		return {
			popupMask: false,
		};
	},
	created() {
		// Listen for popup change
		Popup.on("change", () => {
			this.popupMask = Popup.ID > 0;
		});
		// Change APP view to blank upon logout.
		Session.on("logout", () => {
			DesktopView.navigate("AppMask");
		});
	},
	mounted() {
		Session.init();
	}
};
</script>
