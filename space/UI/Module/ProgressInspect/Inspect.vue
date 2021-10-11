<script setup>
import Button from "/space/UI/Common/Button.vue";
import Badge from "/space/UI/Common/Badge.vue";
import Paragraph from "/space/UI/Common/Paragraph.vue";
import InspectActions from "./InspectActions.vue";
</script>

<template>
	<div class="AppPane _1024">
		<span w100 v-for="el in content" :key="this.reportKey(el)">
			<div
				:ref="this.reportKey(el)"
				class="card list-entry shadow-light shadow-dynamic"
				tabindex="0"
				focus-expand
			>
				<div title>
					<span
						class="small"
						style="align-items: center; color: var(--gray-bright);"
					>
						<i class="fas fa-user-alt" style="opacity: 0.8;"></i>
						<span user-select style="padding: 0 0.5em;">{{ el.userName }}</span>
						<span en-US
							>{{
								reportUpdated(el) ? "updated" : "submitted"
							}}
							at {{ localeDate(el.updateTime) }}</span
						>
						<span zh-CN
							>于 {{ localeDate(el.updateTime) }}
							{{ reportUpdated(el) ? "修改" : "提交" }}</span
						>
						.
					</span>
					<span style="flex-grow: 1"></span>
					<Badge
						type="accent unselected"
						v-for="(fieldID, i) in el.fields"
						:key="i"
						:name="this.badgeName(fieldID)"
						style="--badge-margin: 0 0 0 0.6em; font-size: 0.9em"
					/>
				</div>
				<div content>
					<h4 w100 style="margin: 0.6em 0 0.8em 0">
						<span en-US
							>Student's report content</span
						>
						<span zh-CN>学生的报告内容</span>
					</h4>
					<Paragraph
						v-for="(body, i) in el.body"
						:key="i"
						:text="body"
					/>
				</div>
				<InspectActions
					:userID="el.userID"
					:reportID="el.reportID"
					:fields="el.fields"
					@update="fetch()"
				/>
			</div>
		</span>
		<div class="float _1em Right Bottom">
			<Button
				type="seamless"
				:name="{ 'en-US': 'Refresh', 'zh-CN': '刷新' }[lang]"
				@click="fetch()"
			/>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { OPTIONS } from "../ProgressReport.vue";
import { localeDate } from "/util/date.js";

export default {
	data() {
		return {
			lang: Session.language,
			content: [],
			commentPublic: "",
			commentPrivate: "",
		};
	},
	computed: {
		_name_() {
			return "ProgressInspect/JSON";
		},
	},
	methods: {
		fetch() {
			Session.post("ProgressInspect/JSON")
				.then((content) => (Array.isArray(content) ? content : []))
				.then(
					(content) =>
						(this.content = content.sort(
							(a, b) => a.updateTime - b.updateTime
						))
				);
		},
		reportUpdated(el) {
			return el.submitTime != el.updateTime;
		},
		reportKey(el) {
			return `${el.userID}@${el.reportID}`;
		},
		focus(el) {
			this.$refs[this.reportKey(el)].focus();
		},
		badgeName(fieldName) {
			if (fieldName in OPTIONS) {
				return OPTIONS[fieldName].name[this.lang];
			} else {
				return fieldName;
			}
		}
	},
	created() {
		window.ProgressInspect = this;
	},
	activated() {
		this.fetch();
	},
};
</script>

<style scoped>
</style>