<script setup>
import { LUT } from "../SideBar.vue";
defineProps({
	MODULE_ID: String,
});
</script>

<template>
	<div class="SideBarEntry">
		<i :class="icon" style="font-size: 1.2em; width: 1.2em; margin-right: 0.5em"></i>
		<span en-us>{{ name["en-us"] }}</span>
		<span zh-cn>{{ name["zh-cn"] }}</span>
	</div>
</template>

<script>
import { LUT } from "../SideBar.vue";

export default {
	data() {
		return LUT[this.MODULE_ID];
	}
};
</script>
