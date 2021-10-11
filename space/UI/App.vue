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
	<span :class="lang">
		<!-- Popups -->
		<Login />
		<UserProfile />
		<PopupMask v-if="popupMask" />
		<!-- Top-level UI components -->
		<TitleBar />
		<SideBar />
		<!-- Container -->
		<Container />
	</span>
</template>

<script>
import { Popup, AppView } from "/space/View.js";
import { Session } from "/space/Session.js";

export default {
	data() {
		return {
			lang: "en-US",
			popupMask: false,
		};
	},
	created() {
		const userLang = navigator.language.toLowerCase();
		if (["zh-CN", "en-US"].indexOf(userLang) >= 0) {
			this.lang = Session.lang = userLang;
		} else {
			this.lang = Session.lang = "en-US";
		}
		document.title = {
			"zh-CN": "个人空间",
			"en-US": "User Space",
		}[this.lang];
		Popup.on("change", () => {
			this.popupMask = Popup.ID > 0;
		});
		// Change APP view to blank upon logout.
		Session.on('logout', () => {
			AppView.navigate('AppMask');
		})
	},
};
</script>

<style>
/* Root styles */
:root {
	font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", Helvetica,
		Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
/* Disable user-select by default */
* {
	user-select: none;
	/* Use box-sizing by default */
	box-sizing: border-box;
	/* Clear margin and padding by default */
	padding: 0;
	margin: 0;
	/* Clear element default outline */
	outline: none;
}
/* Hide vue components before Vue is loaded */
[v-cloak] {
	display: none !important;
}
/* Root application div styles */
#app {
	/* Positioning */
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	/* Common Variables */
	--TitleBarHeight: 3rem;
	--SideBarWidth: 16rem;
	--padding: 1rem;
	--padding-large: 2rem;
	--padding-small: 0.6rem;
}
/* UI Layout general styles */
.UI-Top {
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
