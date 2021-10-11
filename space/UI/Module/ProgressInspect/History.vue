<script setup>
import Button from "/space/UI/Common/Button.vue";
</script>


<template>
	<div class="AppPane _1024" style="margin: -2em 0;">
		<span v-for="val in content" :key="val.ID">
			<div class="Entry shadow-light shadow-dynamic" :ref="`el_${val.ID}`">
				<div class="EntryElement title">
					<div class="large">
						{{ titleFormat(val.ID).Date }}&nbsp;
					</div>
					<div class="small">{{ titleFormat(val.ID).Year }}</div>
					<div style="flex-grow: 1"></div>
					<div class="suffix" v-if="val.submitTime != val.updateTime">
						<span zh-CN>更新于</span>
						<span en-US>Last updated at</span>
						&nbsp;
						<span>{{ localeDate(val.updateTime) }}</span>
						<span style="width: 1em"></span>
					</div>
					<div v-else class="suffix">
						<span zh-CN>创建于</span>
						<span en-US>Created at</span>
						&nbsp;
						<span>{{ localeDate(val.submitTime) }}</span>
					</div>
				</div>
				<div class="EntryElement body">
					<div
						class="Paragraph"
						v-for="(text, i) in val.body"
						:key="i"
					>
						{{ text }}
					</div>
				</div>
				<div class="EntryElement inspect">{{ val.fields }}</div>
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

export default {
	data() {
		return {
			lang: Session.language,
			options: OPTIONS,
			content: [],
		};
	},
	computed: {
		_name_() {
			return "ProgressReport/JSON";
		},
	},
	methods: {
		update() {
			Session.post("ProgressReport/JSON")
				.then((content) => {
					this.content = Object.keys(content)
						.sort((a, b) => {
							const A = a.split("-").map((el) => parseInt(el)),
								B = b.split("-").map((el) => parseInt(el));
							for (let i = 0; i < 3; i++) {
								if (A[i] !== B[i]) return B[i] - A[i];
							}
							return 0;
						})
						.map((ID) => ({ ID: ID, ...content[ID] }));
				});
			// this.$forceUpdate();
		},
		localeDate(val) {
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			return new Date(val).toLocaleDateString(undefined, options);
		},
		titleFormat(ID) {
			const [Y, M, D] = ID.split("-");
			return {
				Date: [
					[
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					][parseInt(M) - 1],
					D,
				].join(" "),
				Year: Y,
			};
		},
	},
	created() {
		window.ProgressReportHistory = this;
		this.update();
	},
};
</script>

<style scoped>
.Entry {
	margin: 2em 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.03);
}

.EntryElement {
	padding: var(--padding);
}

.EntryElement.title {
	display: flex;
	align-items: unset;
	justify-content: left;
	color: var(--accent);
	background: var(--accent-light);
	padding: 0.4em var(--padding);
}

.EntryElement.title > * {
	display: flex;
	flex-wrap: wrap;
}

.EntryElement.title .large {
	font-size: 1.6em;
	line-height: 1em;
	height: 1em;
	/* font-weight: bold; */
}

.EntryElement.title .small {
	font-weight: bold;
}

.EntryElement.title .suffix{
	display: flex;
	align-self: center;
	flex-shrink: 1;
	font-size: 0.8em;
	font-weight: lighter;
	color: gray;
}

.EntryElement.body {
	margin: -0.5em 0;
}

.Paragraph {
	padding: 0.3em 0.5em;
	margin: 0.5em 0;
	user-select: text;
	border-left: 0.2em solid var(--accent);
	line-height: 150%;
}

.Paragraph:hover {
	background-color: rgba(0, 0, 0, 0.03);
}

.EntryElement.inspect {
	padding-top: 0;
}

.FieldBage {
	display: inline-block;
	border-radius: 0.3em;
	background-color: gray;
	color: white;
}
</style>