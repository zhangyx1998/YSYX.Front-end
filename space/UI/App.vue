<script setup>
import TitleBar from "./TitleBar.vue";
import SideBar from "./SideBar.vue";
import Container from "./Container.vue";
import Login from "./Popup/Login.vue";
import UserProfile from "./Popup/UserProfile.vue";
</script>

<template>
    <span class="en-us">
		<!-- Popups -->
		<Login />
		<UserProfile />
		<!-- Top-level UI components -->
        <TitleBar />
        <SideBar />
		<!-- Container -->
    </span>
</template>

<style>
/* Root styles */
:root {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
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
    --Padding: 1rem;
}
/* UI Layout general styles */
.UI-Top {
    /* Typesetting */
    font-size: 1rem;
    line-height: 1rem;
    /* Layout */
    position: fixed;
    z-index: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    /* Disable Scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
}
/* Disable Scrollbar */
.UI-Top::-webkit-scrollbar {
    display: none;
}
</style>
