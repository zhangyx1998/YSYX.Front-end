<script setup>
import AppMask from "./Module/mask.vue";
import ProgressReport from "./Module/ProgressReport.vue";
import ProgressInspect from "./Module/ProgressInspect.vue";
</script>

<template>
	<keep-alive>
		<component :is="el" />
	</keep-alive>
</template>

<script>
import { AppView } from "/space/View.js";
import { Session } from "/space/Session.js";
export default {
	data() {
		return {
			display: "AppMask",
		};
	},
	computed: {
		el() {
			const AppList = {
				AppMask: AppMask,
				ProgressReport: ProgressReport,
				ProgressInspect: ProgressInspect,
			};
			return this.display in AppList ? AppList[this.display] : AppList.AppMask;
		},
	},
	created() {
		AppView.on("change", () => {
			const module = AppView.module;
			if (module) {
				this.display = module;
			} else {
				this.display = "AppMask";
			}
		});
	},
};
</script>

<style>
/* Application module positioning */
.AppView {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	top: var(--TitleBarHeight);
	left: var(--SideBarWidth);
	bottom: 0;
	right: 0;
}

/* Application module positioning */
.AppPane {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
	width: 100%;
	overflow-y: scroll;
	padding: var(--padding) var(--padding-large);
}
._1024 {
	max-width: 1024px;
}

/* Appearence */
.AppView h2,
.AppView h3,
.AppView h4,
.AppView h5 {
	line-height: 1.2em;
	color: var(--gray);
}

.AppPane > *,
[root-el] {
	display: block;
	margin-bottom: 1.2rem;
}
/* Input */
.AppView textarea {
	border: none;
	width: 100%;
	padding: 1em;
	font-size: 1.1em;
	background-color: var(--gray-background);
	vertical-align: top;
	outline: none;
	resize: vertical;
	overflow-wrap: normal;
}

.AppView textarea:focus {
	box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>