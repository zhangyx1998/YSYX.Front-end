<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import MobileTitleBar from "../TitleBar.vue";
defineProps({
	data: Object,
});
</script>

<template>
	<MobileTitleBar
		:left="{
			icon: 'fas fa-chevron-left',
			type: 'seamless',
			callback: () => $emit('exit-pane'),
		}"
	/>
	<div MobileView style="padding-bottom: var(--padding)">
		<Dialog :title="data.title" :suffix="data.suffix" class="gray" />
	</div>
</template>
 
<script>
import { locale } from "/util/locale.js";
export default {
	emits: ["show-pane", "exit-pane"],
};
</script>