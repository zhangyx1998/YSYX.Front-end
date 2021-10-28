<script setup>
import Button from "/components/Button.vue";
import Badge from "/components/Badge.vue";
import Paragraph from "/components/Paragraph.vue";
defineProps({
	inspections: Object,
});
</script>

<template>
	<div content>
		<div w100 h-rule style="margin: 1em 0"></div>
		<h5 w100>
			<span en-US>Response from TA</span>
			<span zh-CN>助教的反馈</span>
		</h5>
		<div
			v-for="(inspection, inspectorID) in inspections"
			:key="inspectorID"
		>
			<div inspection-entry>
				<div inspection-header>
					<i
						class="far fa-comment-dots"
						v-if="inspection.public.length"
					></i>
					<i class="fas fa-check" v-else></i>
					<span style="padding: 0 0.5em" user-select>{{
						inspection.Name
					}}</span>
					<span
						v-if="
							inspection.public.length && inspection.fields.length
						"
					>
						<span en-US>read and commented on</span>
						<span zh-CN>查阅并评论了本条记录中关于</span>
					</span>
					<span v-else-if="inspection.fields.length">
						<span en-US>checked your report on</span>
						<span zh-CN>查阅了本条记录中关于</span>
					</span>
					<span v-else-if="inspection.public.length">
						<span en-US>checked your report with comments</span>
						<span zh-CN>查阅并评论了这条记录</span>
					</span>
					<span v-else>
						<span en-US>checked your report</span>
						<span zh-CN>查阅了这条记录</span>
					</span>
					<Badge
						type="gray unselected"
						v-for="(fieldID, i) in inspection.fields"
						:key="i"
						:name="badgeName(fieldID)"
						style="
							--badge-margin: 0 0.6em;
							font-size: 0.8em;
							opacity: 0.6;
						"
					/>
					<span v-if="inspection.fields.length">
						<span zh-CN>的内容</span>
					</span>
					<span style="flex-grow: 1; text-align: right">{{localeDate(inspection.time)}}</span>
				</div>
				<Paragraph
					v-for="(text, i) in inspection.public"
					:key="i"
					:text="text"
					style="margin: 0.5em 0.6em"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { badgeName } from "../ProgressReport.vue";
import { localeDate } from "/util/date.js";
</script>

<style scoped>
[inspection-entry] {
	display: flex;
	flex-direction: column;
	border-radius: 0.3em;
	margin: 1em 0;
	background-color: var(--gray-background);
	color: var(--gray-bright);
	font-size: 0.9em;
}

[inspection-header] {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.4em 0.6em;
	margin: 0 0;
	background-color: var(--gray-background);
	color: var(--gray-bright);
	font-size: 0.9em;
	font-weight: 500;
}
</style>