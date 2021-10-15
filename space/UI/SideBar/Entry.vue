<script setup>
defineProps({
	el: Object,
	selected: Boolean
});
</script>

<template>
	<div :class="['Entry', selected ? 'active' : '']" @click="navigate()">
		<i
			:class="el.icon"
			style="font-size: 1.2em; width: 1.2em; margin-right: 0.5em"
		></i>
		<span en-US>{{ el.name["en-US"] }}</span>
		<span zh-CN>{{ el.name["zh-CN"] }}</span>
	</div>
</template>

<script>
import { DesktopView } from "/space/View.js";
export default {
	methods: {
		navigate() {
			DesktopView.navigate(this.MODULE_ID);
		},
	}
};
</script>
