<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import MobileTitleBar from "../TitleBar.vue";
import BackButton from "/space/UI/Common/BackButton.vue";
defineProps({
	data: Object,
});
</script>

<template>
	<MobileTitleBar>
		<template #left><BackButton @back="$emit('back')"/></template>
	</MobileTitleBar>
	<div MobileView style="padding-bottom: var(--padding)">
		<Dialog :title="data.title" :suffix="data.suffix" class="gray" />
	</div>
</template>
 
<script>
import { locale } from "/util/locale.js";
export default {
	emits: ["show-pane", "back"],
};
</script>