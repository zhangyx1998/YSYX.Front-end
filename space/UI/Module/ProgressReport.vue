<script setup>
import PaneSelector from "/components/AppView/PaneSelector.vue";
import Submit from "./ProgressReport/Submit.vue";
import History from "./ProgressReport/History.vue";
// Mobile only
import MobileTitleBar from "../Mobile/TitleBar.vue";
import BackButton from "/components/Button/BackButton.vue";
</script>

<template>
	<MobileTitleBar
		MobileOnly
		:title="intl({ 'en-US': 'Progress Report', 'zh-CN': '进度报告' })"
	>
		<template #left><BackButton @back="$emit('back')" /></template>
	</MobileTitleBar>
	<div UI-Top ContentView>
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
			@slide-to="(direction) => (slideTo = `slide-${direction}`)"
			@el-height="(val) => (PaneSelectorHeight = val)"
		/>
		<transition :name="slideTo">
			<keep-alive>
				<component
					:is="el"
					:style="
						{
							desktop: {
								top: `${PaneSelectorHeight || 0}px`,
							},
							mobile: {
								'padding-bottom': `${
									PaneSelectorHeight || 0
								}px`,
							},
						}[env.platform]
					"
				/>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import { env, intl } from "/util/env.js";
import { DesktopView } from "/space/View.js";
import { Session } from "/space/Session.js";
import { $select } from "/components/AppView/PaneSelector.vue";

export default {
	emits: ["show-pane", "back"],
	data() {
		return {
			env,
			display: "Submit",
			slideTo: "",
			PaneSelectorHeight: 0,
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
		intl,
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

export function badgeName(fieldName) {
	if (fieldName in OPTIONS) {
		return OPTIONS[fieldName].name[Session.language];
	} else {
		return fieldName;
	}
}
</script>