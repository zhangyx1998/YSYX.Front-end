<script setup>
import Posts from "/space/UI/Module/Dashboard/Posts.vue";
</script>

<template>
	<Posts />
</template>

<script>
import { Session } from "/space/Session.js";

export default {
	emits: ["show-pane"],
	data() {
		return {
			SessionData: Session.data
		};
	},
	activated() {
		console.log(this);
	},
};
</script>

<style scoped>
</style>