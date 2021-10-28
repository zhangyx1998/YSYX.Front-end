<script setup>
import DesktopView from "./DesktopView.vue";
import MobileView from "./MobileView.vue";
</script>

<template>
	<span :class="[env.locale, env.platform]">
		<component :is="view" />
	</span>
</template>

<script>
// Run session initializer
import "/space/Session.js";
import { env, intl } from "/util/env.js";

export default {
	data() {
		return {
			env,
		};
	},
	computed: {
		view() {
			return {
				desktop: DesktopView,
				mobile: MobileView,
			}[this.env.platform];
		},
	},
	created() {
		window.App = this;
		// Listen for env change
		env.on("update", () => {
			// Set application background
			document.getElementById("app").style.backgroundColor = {
				desktop: "white",
				mobile: "black",
			}[this.env.platform];
			// Set document title
			document.title = intl({
				'en-US': 'Space|YSYX',
				'zh-CN': '个人空间|一生一芯',
			});
			// Force update
			this.$forceUpdate();
		});
		// Call for initial update
		env.call('update');
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
	/* Common Variables */
	--TitleBarHeight: 3rem;
	--SideBarWidth: 13rem;
	--padding: 1rem;
	--padding-large: 2rem;
	--padding-small: 0.6rem;
}
* {
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
	width: 100%;
	height: 100%;
}
</style>
