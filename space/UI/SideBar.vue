<script setup>
defineProps({
	Name: String,
});
</script>

<template>
	<div id="SideBar" class="UI-Top">
	</div>
</template>

<style>
#SideBar {
	box-sizing: border-box;
	/* Positioning */
	left: 0;
	bottom: 0;
	width: var(--SideBarWidth);
	height: calc( 100vh - var(--TitleBarHeight) );
	/* Layout */
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 var(--Padding);
	/* Appearance */
	border-right: 1px solid #cccccc;
}
</style>