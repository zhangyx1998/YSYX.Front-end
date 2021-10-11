<script setup>
import Badge from "/space/UI/Common/Badge.vue";
import Paragraph from "/space/UI/Common/Paragraph.vue";
defineProps({
	state: String,
	pending: Array,
});
</script>

<template>
	<div content>
		<div w100 h-rule style="margin: 1em 0"></div>
	</div>
	<div content flex-row class="state pending" v-if="pending.length">
		<i class="far fa-clock"></i>
		<span expand-line></span>
		<span en-US>Awaiting review for topic:&nbsp;</span>
		<span zh-CN>等待助教阅读的内容：</span>
		<Badge
			type="accent unselected"
			v-for="(fieldID, i) in pending"
			:key="i"
			:name="badgeName(fieldID)"
			style="--badge-margin: 0 0 0 0.6em; font-size: 0.9em; opacity: 0.9"
		/>
	</div>
	<div content flex-row class="state complete" v-if="state == 'complete'">
		<i class="fas fa-check-circle"></i>
		<span expand-line></span>
		<span en-US
			>All topics of this report have been reviewed by TA team.</span
		>
		<span zh-CN>助教团队已经阅读了该报告中的所有内容</span>
	</div>
	<div content flex-row class="state empty" v-if="state == 'empty'">
		<i class="fas fa-cross-circle"></i>
		<span expand-line></span>
		<span en-US>You did not specify any topics of your report.</span>
		<span zh-CN>您没有为本次报告设置任何主题</span>
	</div>
</template>

<script>
import { badgeName } from "../ProgressReport.vue";
</script>

<style scoped>
.FieldBage {
	display: inline-block;
	border-radius: 0.3em;
	background-color: gray;
	color: white;
}

.state {
	margin-top: 1em;
	opacity: 0.8;
}

.state [expand-line] {
	flex-grow: 1;
	border-bottom: 0.08em dashed var(--theme-color);
	margin: 0 0.6em;
	opacity: 0.5;
}

.state > * {
	font-size: 0.9em;
	color: var(--theme-color);
}

.state > i {
	font-size: 1.2em;
}

.state.complete {
	--theme-color: var(--green-bright);
}

.state.pending {
	opacity: 0.7;
	--theme-color: var(--accent);
}

.state.empty {
	--theme-color: var(--gray-bright);
}
</style>