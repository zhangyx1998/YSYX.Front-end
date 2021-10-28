<script setup>
import Responsive from "/components/Responsive.vue";
import Button from "/components/Button.vue";
defineProps({
	validate: Function,
	value: String,
});
</script>

<template>
	<Responsive lighter Entry>
		<div title><slot></slot></div>
		<div EntryVal>
			<input :value="value" disabled />
		</div>
		<div lighter EntryAction>
			<Button type="link" :name="intl({'en-US': 'edit', 'zh-CN': '编辑'})" />
		</div>
	</Responsive>
</template>

<script>
import { intl } from '/util/env.js';
</script>

<style scoped>
@import "./index.css";
</style>