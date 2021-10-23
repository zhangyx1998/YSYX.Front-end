<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
</script>

<template>
	<Dialog
		class="gray"
		style="opacity: 0.8;"
		:title="intl({
			'en-US': 'Feature under development',
			'zh-CN': '该功能正在开发中'
		})"
	/>
</template>

<script>
import { intl } from "/util/env.js";
export default {
	methods: {
		intl
	}
}
</script>