<script setup>
import AppMask from "../Module/mask.vue";
import ProgressReport from "../Module/ProgressReport.vue";
import ProgressInspect from "../Module/ProgressInspect.vue";
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