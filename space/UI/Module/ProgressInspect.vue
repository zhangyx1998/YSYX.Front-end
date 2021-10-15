<script setup>
import PaneSelector from "/space/UI/Common/PaneSelector.vue";
import Inspect from "./ProgressInspect/Inspect.vue";
import History from "./ProgressInspect/History.vue";
import Settings from "./ProgressInspect/Settings.vue";
// Mobile only
import MobileTitleBar from '../Mobile/TitleBar.vue';
</script>

<template>
	<MobileTitleBar
		v-if="platform === 'mobile'"
		:left="{
			icon: 'fas fa-chevron-left',
			type: 'seamless',
			callback: () => $emit('exit-pane'),
		}"
	/>
	<div UI-Top DesktopView MobileView>
		<PaneSelector
			:panes="{
				Inspect: {
					name: {
						'zh-CN': '进度报告审阅',
						'en-US': 'Inspect',
					},
				},
				History: {
					name: {
						'zh-CN': '审阅记录',
						'en-US': 'History',
					},
				},
				Settings: {
					name: {
						'zh-CN': '相关设置',
						'en-US': 'Settings',
					},
				},
			}"
			defaultPane="Inspect"
			@select="select"
		/>
		<keep-alive>
			<component :is="el" />
		</keep-alive>
	</div>
</template>

<script>
import { platform } from "/space/UI/App.vue";
import { DesktopView } from "/space/View.js";
import { Session } from "/space/Session.js";
import { $select } from "/space/UI/Common/PaneSelector.vue";

export default {
	emits: ["show-pane", "exit-pane"],
	data() {
		return {
			platform,
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
				Settings: Settings,
			}[this.display];
		},
	},
	methods: {
		select(name) {
			$select(this, name);
		},
	},
	activated() {
		console.log(this);
	},
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