<script setup>
import Button from "/space/UI/Common/Button.vue";
defineProps({
	iconOnly: Boolean
})
</script>

<template>
	<div RefreshButton>
		<Button
			type="outlined gray"
			icon="fas fa-sync-alt"
			style="border-radius: 1em;"
			class="shadow-light shadow-dynamic"
			:name="iconOnly ? '' : { 'en-US': 'Refresh', 'zh-CN': '刷新' }[locale.$]"
			@click="$emit('refresh')"
		/>
	</div>
</template>


<script>
import { locale } from '/util/locale.js';
export default {
	emits: ['refresh'],
};
</script>

<style scoped>
[RefreshButton] {
	position: absolute;
	right: 1em;
	bottom: 1em;
}
</style>