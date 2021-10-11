<script setup>
import Button from "/space/UI/Common/Button.vue";
import Badge from "/space/UI/Common/Badge.vue";
import Paragraph from "/space/UI/Common/Paragraph.vue";
</script>


<template>
	<div class="AppPane _1024">
		<h2 w100 v-if="!updateID">
			<span en-US>Report your awesome progress</span>
			<span zh-CN>记录你的进展</span>
		</h2>
		<h2 w100 v-else>
			<span en-US>Update your progress for today</span>
			<span zh-CN>更新今日的进展记录</span>
		</h2>
		<span w100 h-rule></span>
		<span w100 v-if="updateID">
			<h3 root-el>
				<span en-US>Previously reported</span>
				<span zh-CN>今日已经记录的内容</span>
			</h3>
			<Paragraph
				v-for="(text, i) in updateEl.body"
				:key="i"
				:text="text"
				style="margin-bottom: 0"
			/>
		</span>
		<h3 w100>
			<span en-US>Add some new progress</span>
			<span zh-CN>记录新的进展</span>
		</h3>
		<textarea
			v-model="text"
			:placeholder="
				{
					'en-US': 'Report text goes here ...',
					'zh-CN': '在这里输入报告正文',
				}[lang]
			"
			style="min-height: 12em"
		/>
		<h3 w100>
			<span en-US>Related fields of your report</span>
			<span zh-CN>与你的报告相关的话题</span>
		</h3>
		<div w100 style="display: flex; flex-wrap: wrap">
			<span v-for="(el, ID) in options" :key="ID" style="display: flex">
				<Badge
					type="accent interactive"
					:state="this.badgeState(ID, el)"
					:name="el.name[lang]"
					@click="el.selected = !el.selected"
					style="--badge-margin: 0 0.8em 0.6em 0"
				/>
			</span>
		</div>
		<div
			w100
			h-rule
			style="
				display: flex;
				justify-content: center;
				--button-margin: 1.2em 0.8em 0 0.8em;
			"
		>
			<Button
				type="colored gray"
				:name="{ 'en-US': 'Clear', 'zh-CN': '清空' }[lang]"
				@click="clear()"
			/>
			<Button
				v-if="!updateID"
				type="colored green"
				:name="{ 'en-US': 'Submit', 'zh-CN': '提交' }[lang]"
				@click="submit()"
			/>
			<Button
				v-else
				type="colored green"
				:name="{ 'en-US': 'Update', 'zh-CN': '更新' }[lang]"
				@click="update()"
			/>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { OPTIONS } from "../ProgressReport.vue";
import { timeZone } from "/util/date.js";
import { assert } from "/util/diagnostics.js";
import { digVal } from "/util/object.js";

export default {
	data() {
		return {
			lang: Session.language,
			options: OPTIONS,
			text: "",
			updateID: "",
			updateEl: {},
		};
	},
	computed: {
		_name_() {
			return "ProgressReport/template";
		},
	},
	methods: {
		init() {
			this.text = "";
			this.updateID = "";
			this.updateEl = {};
			Session.post("ProgressReport/Today", {
				timeZone: timeZone(),
			}).then((data) => {
				for (const reportID in data) {
					const reportEl = data[reportID];
					assert(this.updateID === "");
					this.updateID = reportID;
					this.updateEl = reportEl;
				}
			});
		},
		submit() {
			Session.post("ProgressReport/Submit", {
				timeZone: timeZone(),
				body: this.text,
				fields: Object.keys(this.options).filter(
					(el) => this.options[el].selected
				),
			}).then((data) => {
				if (digVal(data, "valid")) {
					this.init();
					alert("Successful");
				} else {
					alert(`error: ${data.cause}`);
				}
			});
		},
		update() {
			Session.post("ProgressReport/Update", {
				reportID: this.updateID,
				body: this.text,
				fields: Object.keys(this.options).filter(
					(el) => this.options[el].selected
				),
			}).then((data) => {
				if (digVal(data, "valid")) {
					this.init();
					alert("Successful");
				} else {
					alert(`error: ${data.cause}`);
				}
			});
		},
		fieldSelectable(ID) {
			const list = digVal(this.updateEl, "fields") || {};
			return !(typeof list == "object" && ID in list);
		},
		badgeState(ID, el) {
			return this.fieldSelectable(ID)
				? el.selected
					? "selected"
					: "unselected"
				: "disabled";
		},
		clear() {
			if (
				confirm(
					{
						"zh-CN": "确认要清空本页已经填写的所有内容吗？",
						"en-US": "Clear all contents you filled in this page?",
					}[this.lang]
				)
			) {
				this.text = "";
				for (const el in this.options) {
					this.options[el].selected = false;
				}
			}
		},
	},
	created() {
		window.ProgressReportSubmit = this;
	},
	activated() {
		this.init();
	},
};
</script>

<style scoped>
/* Options */
.Option {
	cursor: pointer;
	display: flex;
	font-size: 1em;
	color: var(--accent);
	border-radius: 0.3em;
	margin-bottom: 0.8em;
	margin-right: 0.8em;
	padding: 0.2em 0.4em;
	opacity: 0.6;
	background: var(--accent-light);
	border: 0.1em solid transparent;
}

.Option:hover {
	opacity: 0.8;
}

.Option:active {
	opacity: 0.7;
}

.Option.active {
	opacity: 1;
	background: var(--accent);
	color: white;
}

.Option.fixed {
	cursor: default;
	opacity: 0.8;
	background: var(--accent-light);
	color: var(--accent);
	border: 0.1em solid var(--accent);
}
</style>