<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
</script>

<template>
	<Dialog
		class="gray"
		style="opacity: 0.8;"
		:title="{
			'en-US': 'Feature under development',
			'zh-CN': '该功能正在开发中'
		}[locale.$]"
	/>
</template>

<script>
import { locale } from "/util/locale.js";
export default {
	data() {
		return {
			locale
		}
	}
}
</script>