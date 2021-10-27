<script setup>
import Button from "/components/Button.vue";
defineProps({
	iconOnly: Boolean
})
</script>

<template>
	<div RefreshButton v-if="env.platform == 'desktop'">
		<Button
			type="outlined gray"
			icon="fas fa-sync-alt"
			style="border-radius: 1em;"
			class="shadow-light shadow-dynamic"
			:name="iconOnly ? '' : intl({ 'en-US': 'Refresh', 'zh-CN': '刷新' })"
			@click="$emit('refresh')"
		/>
	</div>
</template>


<script>
import { intl } from '/util/env.js';
import { env } from "/util/env.js";
export default {
	emits: ['refresh'],
	data() {
		return {
			env
		}
	},
	computed: {
		intl
	}
};
</script>

<style scoped>
[RefreshButton] {
	position: absolute;
	right: 1em;
	bottom: 1em;
}
</style>