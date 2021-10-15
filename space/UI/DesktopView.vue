<script setup>
// Top level UI components
import TitleBar from "./TitleBar.vue";
import SideBar from "./SideBar.vue";
// Popup components
import Login from "./Popup/Login.vue";
import UserProfile from "./Popup/UserProfile.vue";
import PopupMask from "./Popup/mask.vue";
// Application module components
import Container from "./Container.vue";
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
	}
};
</script>

<style>
/* UI Layout general styles */
.desktop [UI-Top] {
	/* Typesetting */
	font-size: 1rem;
	line-height: 1rem;
	/* Positioning */
	position: fixed;
	z-index: 0;
	/* Layout */
	overflow-x: hidden;
	overflow-y: scroll;
}
/* Disable scrollbar by default */
* {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
/* Safari */
*::-webkit-scrollbar {
	display: none;
}
</style>
