<script setup>
import Button from "/space/UI/Common/Button.vue";
import Paragraph from "/space/UI/Common/Paragraph.vue";
import InspectInfo from "./InspectInfo.vue";
import InspectState from "./InspectState.vue";
</script>

<template>
	<div class="AppPane _1024">
		<span w100 v-for="el in content" :key="el.ID">
			<div class="card list-entry shadow-light shadow-dynamic">
				<div title>
					<div class="large">{{ titleFormat(el.ID).Date }}&nbsp;</div>
					<div class="small">{{ titleFormat(el.ID).Year }}</div>
					<div style="flex-grow: 1"></div>
					<div class="suffix">
						<span v-if="el.submitTime != el.updateTime">
							<span zh-CN>最后更新于</span>
							<span en-US>Updated at</span>
						</span>
						<span v-else>
							<span zh-CN>创建于</span>
							<span en-US>Created at</span>
						</span>
						&nbsp;
						<span>{{ localeDate(el.updateTime) }}</span>
					</div>
				</div>
				<div content>
					<h5 w100>
						<span en-US
							>Your progress report content for this day</span
						>
						<span zh-CN>当日的进度报告内容</span>
					</h5>
					<Paragraph
						v-for="(text, i) in el.body"
						:key="i"
						:text="text"
					/>
				</div>
				<InspectInfo
					:inspections="el.inspections"
					v-if="el.checked.length"
				/>
				<InspectState :state="el.state" :pending="el.unchecked" />
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
import { monthShort, localeDate } from "/util/date.js";
import { digVal } from "/util/object.js";

export default {
	data() {
		return {
			lang: Session.language,
			content: [],
		};
	},
	computed: {
		_name_() {
			return "ProgressReport/JSON";
		},
	},
	methods: {
		fetch() {
			Session.post("ProgressReport/JSON").then((content) => {
				this.content = Object.keys(content)
					.sort((a, b) => {
						const A = a.split("-").map((el) => parseInt(el)),
							B = b.split("-").map((el) => parseInt(el));
						for (let i = 0; i < 3; i++) {
							if (A[i] !== B[i]) return B[i] - A[i];
						}
						return 0;
					})
					.map((ID) => ({
						ID: ID,
						...((reportEntry) => {
							const { fields, inspections } = reportEntry;
							let checked = Object.keys(fields).filter(
									(field) => fields[field]
								),
								unchecked = Object.keys(fields).filter(
									(field) => checked.indexOf(field) < 0
								),
								state = ((a, b) => {
									if (a == 0 && b == 0) return "empty";
									if (a > 0 && b == 0) return "complete";
									return "pending";
								})(checked.length, unchecked.length);
							for (const inspectorID in inspections) {
								const inspection = inspections[inspectorID];
								["public", "private"].forEach((entry) => {
									if (Array.isArray(inspection[entry]))
										inspection[entry] = inspection[
											entry
										].filter((str) => str.trim());
								});
								inspection.fields = Object.keys(fields).filter(
									(fieldName) =>
										digVal(fields, fieldName, 'inspectorID') === inspectorID
								);
							}
							console.log({
								state,
								checked,
								unchecked,
								...reportEntry,
							});
							return {
								state,
								checked,
								unchecked,
								...reportEntry,
							};
						})(content[ID]),
					}));
			});
			// this.$forceUpdate();
		},
		localeDate,
		titleFormat(ID) {
			const [Y, M, D] = ID.split("-");
			return {
				Date: `${monthShort(M)} ${D}`,
				Year: Y,
			};
		},
	},
	created() {
		window.ProgressReportHistory = this;
	},
	activated() {
		this.fetch();
	},
};
</script>

<style scoped>
[content] {
	margin-top: 0.5em;
}

h4,
h5 {
	margin-bottom: 1em;
}
</style>