<script setup>
import Button from "/space/UI/Common/Button.vue";
import Badge from "/space/UI/Common/Badge.vue";
import Paragraph from "/space/UI/Common/Paragraph.vue";
defineProps({
	userID: String,
	reportID: String,
	fields: Array,
});
</script>

<template>
	<div content focus-only>
		<div w100 h-rule style="margin: 1em 0"></div>
		<h4 w100>
			<span en-US>Comment public to this student</span>
			<span zh-CN>学生可见的评论</span>
		</h4>
		<textarea
			v-model="commentPublic"
			:placeholder="
				{
					'en-US':
						'[optional] Student will see the content you typed here',
					'zh-CN': '[选填] 学生可以看见在此处填写的评论',
				}[lang]
			"
			style="margin: 1em 0 1.2em 0; min-height: 1em"
		/>
		<h4 w100>
			<span en-US>Private comment, only shared internally</span>
			<span zh-CN>仅组织成员可见的评论</span>
		</h4>
		<textarea
			v-model="commentPrivate"
			:placeholder="
				{
					'en-US':
						'[optional] Only administrators and teaching assistants will see what you typed here',
					'zh-CN': '[选填] 在此处填写的评论仅对管理员和助教可见',
				}[lang]
			"
			style="margin: 1em 0 0.6em 0; min-height: 1em"
		/>
	</div>
	<div actions focus-only tabindex="-1" ref="el">
		<Button
			type="colored gray"
			icon="fas fa-paper-plane"
			:name="{ 'en-US': 'Reallocate', 'zh-CN': '清空' }[lang]"
			@click="reallocate()"
		/>
		<Button
			type="colored blue"
			icon="far fa-check-circle"
			:name="
				{
					'en-US': 'Mark as Inspected',
					'zh-CN': '标为已审阅',
				}[lang]
			"
			@click="inspect()"
		/>
	</div>
	<div
		blur-only
		style="
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-contents: center;
		"
	>
		<div h-rule style="flex-grow: 1"></div>
		<div
			style="
				padding: 0 1em;
				color: var(--gray-bright);
				font-size: 0.8em;
				line-height: 1em;
			"
		>
			<span en-US>click to inspect</span>
			<span zh-CN>点击卡片展开详情</span>
		</div>
		<div h-rule style="flex-grow: 1"></div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";

export default {
	data() {
		return {
			lang: Session.language,
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
		reallocate() {
			const { userID, reportID, fields } = this;
			Session.post("ProgressInspect/Reallocate", {
				userID,
				reportID,
				fields,
			}).then(({ valid, cause }) => {
				if (!valid) {
					alert(`Reallocation failed: ${cause}`);
				}
				this.$emit("update");
			});
		},
		inspect() {
			const { userID, reportID, fields } = this;
			const { commentPublic, commentPrivate } = this;
			Session.post("ProgressInspect/Inspect", {
				userID,
				reportID,
				fields,
				commentPublic,
				commentPrivate,
			}).then(({ valid, cause }) => {
				if (!valid) {
					alert(`Reallocation failed: ${cause}`);
				}
				this.$emit("update");
			});
		},
	},
	emits: ["update"]
};
</script>