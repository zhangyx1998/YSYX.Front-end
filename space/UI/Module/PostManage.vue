<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import BackButton from "/space/UI/Common/BackButton.vue";
import MobileTitleBar from "../Mobile/TitleBar.vue";
defineProps({
	args: Object,
});
</script>

<template>
	<MobileTitleBar
		:title="
			intl(
				ID
					? { 'en-US': 'Edit Post', 'zh-CN': '编辑公告' }
					: { 'en-US': 'Create Post', 'zh-CN': '发布公告' }
			)
		"
	>
		<template #left><BackButton @back="$emit('back')" /></template>
	</MobileTitleBar>
	<div
		UI-Top
		ContentView
		style="padding-bottom: var(--mobile-title-bar-height)"
	>
		<Dialog suffix="Post Manage" class="gray" />
	</div>
</template>
 
<script>
import { intl } from "/util/env.js";
export default {
	emits: ["show-pane", "back"],
	data() {
		return {
			ID: "",
			post: {},
		};
	},
	methods: {
		intl
	},
	activated() {
		const { ID, ...post } = this.args || {};
		this.ID = ID;
		this.post = post;
	},
};
</script>