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
import { DesktopView } from "/space/View.js";
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
		DesktopView.on("change", () => {
			const module = DesktopView.module;
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
.desktop [DesktopView] {
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
.desktop [DesktopView] h1,
.desktop [DesktopView] h2,
.desktop [DesktopView] h3,
.desktop [DesktopView] h4,
.desktop [DesktopView] h5 {
	line-height: 1.2em;
	color: var(--gray);
}

.AppPane > *,
[root-el] {
	display: block;
	margin-bottom: 1.2rem;
}
</style>