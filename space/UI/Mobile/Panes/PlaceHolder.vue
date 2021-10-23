<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import MobileTitleBar from "../TitleBar.vue";
import BackButton from "/space/UI/Common/BackButton.vue";
defineProps({
	data: Object,
});
</script>

<template>
	<MobileTitleBar :title="data.title">
		<template #left><BackButton @back="$emit('back')" /></template>
	</MobileTitleBar>
	<div ContentView style="padding-bottom: var(--mobile-title-bar-height)">
		<Dialog :suffix="data.suffix" class="gray" />
	</div>
</template>
 
<script>
export default {
	emits: ["show-pane", "back"],
};
</script>