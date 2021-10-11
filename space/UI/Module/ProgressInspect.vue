<script setup>
import PaneSelector from "/space/UI/Common/PaneSelector.vue";
import Inspect from "./ProgressInspect/Inspect.vue";
import History from "./ProgressInspect/History.vue";
</script>

<template>
	<div class="UI-Top AppView">
		<PaneSelector :el="this" />
		<keep-alive>
			<component :is="el" />
		</keep-alive>
	</div>
</template>

<script>
import { AppView } from "/space/View.js";
import { Session } from "/space/Session.js";

export default {
	data() {
		return {
			panes: {
				Inspect: {
					name: {
						"zh-CN": "进度报告审阅",
						"en-US": "Inspect Reports",
					},
				},
				History: {
					name: {
						"zh-CN": "审阅记录",
						"en-US": "Inspection History",
					},
				},
			},
			display: "Inspect",
		};
	},
	computed: {
		_name_() {
			return "ProgressInspect";
		},
		el() {
			return {
				Inspect: Inspect,
				History: History,
			}[this.display];
		},
	},
	activated() {},
};

export const OPTIONS = {
	"ics-PA": {
		selected: false,
		name: {
			"en-US": "NJU ICS PA",
			"zh-CN": "NJU 计算机系统实验",
		},
	},
	verilog: {
		selected: false,
		name: {
			"en-US": "verilog",
			"zh-CN": "verilog",
		},
	},
	verilator: {
		selected: false,
		name: {
			"en-US": "verilator",
			"zh-CN": "verilator",
		},
	},
	"single-period-cpu": {
		selected: false,
		name: {
			"en-US": "single-period-cpu",
			"zh-CN": "single-period-cpu",
		},
	},
	difftest: {
		selected: false,
		name: {
			"en-US": "difftest",
			"zh-CN": "difftest",
		},
	},
	AXI: {
		selected: false,
		name: {
			"en-US": "AXI",
			"zh-CN": "AXI",
		},
	},
	"out-of-order": {
		selected: false,
		name: {
			"en-US": "out-of-order",
			"zh-CN": "out-of-order",
		},
	},
	cache: {
		selected: false,
		name: {
			"en-US": "cache",
			"zh-CN": "cache",
		},
	},
	SOC: {
		selected: false,
		name: {
			"en-US": "SOC",
			"zh-CN": "SOC",
		},
	},
};
</script>

<style scoped>
</style>