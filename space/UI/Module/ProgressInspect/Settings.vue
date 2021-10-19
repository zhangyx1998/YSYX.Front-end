<script setup>
import Button from "/space/UI/Common/Button.vue";
import Badge from "/space/UI/Common/Badge.vue";
import RefreshButton from "/space/UI/Common/RefreshButton.vue";
</script>

<template>
	<div
		Content _1024_
	>
		<span w100 v-for="field in content" :key="field.feildName">
			<div
				:class="[
					'card',
					'list-seamless',
					field.selected ? 'accent selected' : 'gray',
				]"
				tabindex="0"
				focus-expand
			>
				<div title style="justify-content: space-between;">
					<span class="large">{{ badgeName(field.fieldName) }}</span>
					<span
						class="suffix yellow"
						v-if="(cnt = field.failedAllocList.length)"
					>
						<i
							class="fas fa-exclamation-circle"
							style="margin-right: 0.5em"
						></i>
						<span en-US>failed to allocate {{ cnt }} report</span>
						<span zh-CN>有 {{ cnt }} 个未分配的报告</span>
					</span>
					<span class="suffix green" v-else>
						<i class="fas fa-check" style="margin-right: 0.5em"></i>
						<span en-US>all reports has been allocated</span>
						<span zh-CN>所有报告均分配完成</span>
					</span>
				</div>
				<!-- <div content><div h-rule style="margin: 0.5em"></div></div> -->
				<div content>
					<div inspector-list>
						<div
							inspector-list-header
							v-if="field.inspectors.length"
						>
							<span en-US>Currently responsible assistants</span>
							<span zh-CN>当前对该话题负责的助教</span>
						</div>
						<div inspector-list-header v-else>
							<span en-US
								>No assistant is currently responsible for this
								field</span
							>
							<span zh-CN>目前没有对该话题负责的助教</span>
						</div>
						<div flex-row>
							<Badge
								type="accent unselected"
								v-for="(inspector, i) in field.inspectors"
								:key="i"
								:name="inspector.Name"
								style="
									--badge-margin: 0.8em;
									font-size: 0.9em;
									opacity: 0.9;
								"
							/>
						</div>
					</div>
				</div>
				<!-- <div content><div h-rule></div></div> -->
				<div actions style="--button-margin: 0 0 0 1em">
					<Button
						v-if="field.failedAllocList.length"
						type="outlined gray"
						:name="
							{
								'en-US': 'Force reallocate',
								'zh-CN': '强制重分配',
							}[locale.$]
						"
					/>
					<Button
						v-if="field.selected"
						type="outlined red"
						:name="
							{
								'en-US': 'Remove',
								'zh-CN': '移除',
							}[locale.$]
						"
						@click="removeField(field.fieldName)"
					/>
					<Button
						v-else
						type="solid gray"
						:name="
							{
								'en-US': 'Add',
								'zh-CN': '添加',
							}[locale.$]
						"
						@click="addField(field.fieldName)"
					/>
				</div>
			</div>
		</span>
		<RefreshButton @refresh="fetch" />
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { badgeName } from "../ProgressReport.vue";
import { locale } from "/util/locale.js";

export default {
	data() {
		return {
			locale,
			content: [],
		};
	},
	computed: {
		_name_() {
			return "ProgressInspect/Settings";
		},
	},
	methods: {
		fetch() {
			Session.post("ProgressInspect/Fields").then((content) => {
				this.content = content.sort((a, b) =>
					a.fieldName > b.fieldName
						? 1
						: a.fieldName < b.fieldName
						? -1
						: 0
				);
			});
		},
		addField(fieldName) {
			Session.post("ProgressInspect/addField", fieldName).then(
				({ valid, cause }) => {
					if (!valid) {
						alert(cause);
					}
					this.fetch();
				}
			);
		},
		removeField(fieldName) {
			Session.post("ProgressInspect/removeField", fieldName).then(
				({ valid, cause }) => {
					if (!valid) {
						alert(cause);
					}
					this.fetch();
				}
			);
		},
	},
	activated() {
		console.log(this);
		this.fetch();
	},
};
</script>

<style scoped>
[inspector-list] {
	display: flex;
	flex-direction: column;
	border-radius: 0.3em;
	margin-top: 0.2em;
	margin-bottom: 1em;
	background-color: var(--gray-background);
	color: var(--gray-bright);
	font-size: 0.9em;
}

[inspector-list-header] {
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