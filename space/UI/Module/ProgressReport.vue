<script setup>
import PaneSelector from "/space/UI/Common/PaneSelector.vue";
import Submit from "./ProgressReport/Submit.vue";
import History from "./ProgressReport/History.vue";
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
				Submit: {
					name: {
						'zh-CN': '提交报告',
						'en-US': 'Submit Report',
					},
				},
				History: {
					name: {
						'zh-CN': '历史报告',
						'en-US': 'Report History',
					},
				},
			}"
			defaultPane="Submit"
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
			display: "Submit",
		};
	},
	computed: {
		_name_() {
			return "ProgressReport";
		},
		el() {
			return {
				Submit: Submit,
				History: History,
			}[this.display];
		},
	},
	methods: {
		select(name) { $select(this, name); }
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

export function badgeName(fieldName) {
	if (fieldName in OPTIONS) {
		return OPTIONS[fieldName].name[Session.language];
	} else {
		return fieldName;
	}
}
</script>