<script setup>
defineProps({
	type: String,
	icon: String,
	name: String,
});
</script>

<template>
	<div class="button" :class="type">
		<i v-if="icon" :class="icon" style="font-size: 1.1em; margin-right: 0.2em"></i>
		<span style="display: inline-flex; font-size: 0.9em; padding: 0; margin: 0">{{ name }}</span>
	</div>
</template>

<style>
div.button {
	border-radius: 0.2em;
	display: flex;
	padding: 0.2em 0.3em;
	align-items: center;
}
div.button > * {
	display: flex;
}
/* button.seamless */
div.button.seamless:hover {
	background-color: rgba(0, 0, 0, 0.1);
}
div.button.seamless:active {
	background-color: rgba(0, 0, 0, 0.2);
}
/* button.positive */
/* button.negative */
/* button.disabled */
</style>