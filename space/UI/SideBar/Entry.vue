<script setup>
defineProps({
	MODULE_ID: String,
});
</script>

<template>
	<div :class="['Entry', active ? 'active' : '']" @click="navigate()">
		<i
			:class="display.icon"
			style="font-size: 1.2em; width: 1.2em; margin-right: 0.5em"
		></i>
		<span en-US>{{ display.name["en-US"] }}</span>
		<span zh-CN>{{ display.name["zh-CN"] }}</span>
	</div>
</template>

<script>
import { LUT } from "../SideBar.vue";
import { AppView } from "/space/View.js";
export default {
	data() {
		return {
			display: LUT[this.MODULE_ID],
			active: false
		};
	},
	methods: {
		navigate() {
			AppView.navigate(this.MODULE_ID);
		},
	},
	created() {
		AppView.on("change", () => {
			this.active = AppView.module == this.MODULE_ID;
		});
	},
};
</script>
