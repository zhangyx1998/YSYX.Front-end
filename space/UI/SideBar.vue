<script setup>
import SideBarEntry from "./SideBar/Entry.vue";
</script>

<template>
	<div id="SideBar" class="UI-Top">
		<div
			v-for="(role, roleName) in roles"
			:key="roleName"
			style="width: 100%"
		>
			<div class="roleWrapper" v-if="role.show">
				<div class="roleName" en-us>{{ role["en-us"] }}</div>
				<div class="roleName" zh-cn>{{ role["zh-cn"] }}</div>
				<span v-for="(el, moduleID) in LUT" :key="moduleID">
					<SideBarEntry
						v-if="el.show && (el.role === roleName)"
						:MODULE_ID="moduleID"
					/>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";

export default {
	data() {
		return {
			LUT: LUT,
			roles: {
				WebAdmin: {
					show: false,
					"zh-cn": "站点管理",
					"en-us": "Site Admin",
				},
				TAssistant: {
					show: false,
					"zh-cn": "项目管理",
					"en-us": "Project Admin",
				},
				Participant: {
					show: false,
					"zh-cn": "参与项目",
					"en-us": "Participant",
				},
			},
		};
	},
	computed: {
		roleList() {
			return Object.keys(this.roles).filter(
				(el) => el in this.LUT && this.LUT[el].show
			);
		},
	},
	created() {
		window.SideBar = this;
		Session.on("login", () => {
			Session.post("Modules")
				.then((res) => res.json())
				.then(({ Modules }) => {
					for (const module in this.LUT) {
						const show = Modules.indexOf(module) >= 0;
						this.LUT[module].show = show;
						const role = this.LUT[module].role;
						this.roles[role].show ||= show;
					}
				});
		});
	},
};

export const LUT = {
	StudyPlan: {
		role: "Participant",
		icon: "far fa-compass",
		name: {
			"zh-cn": "项目规划",
			"en-us": "Study Plan",
		},
		show: false,
	},
	ProgressReport: {
		role: "Participant",
		icon: "fas fa-tasks",
		name: {
			"zh-cn": "进度记录",
			"en-us": "Prog. Report",
		},
		show: false,
	},
	Analytics: {
		role: "TAssistant",
		icon: "fas fa-chalkboard-teacher",
		name: {
			"zh-cn": "讲座管理",
			"en-us": "Lecture Mgn",
		},
		show: false,
	},
	PendingRequest: {
		role: "TAssistant",
		icon: "fab fa-buffer",
		name: {
			"zh-cn": "待处理请求",
			"en-us": "Pending Req.",
		},
		show: false,
	},
	ProgressInspect: {
		role: "TAssistant",
		icon: "fas fa-calendar-check",
		name: {
			"zh-cn": "学生进度检查",
			"en-us": "Prog. Inspect",
		},
		show: false,
	},
	GroupAssignment: {
		role: "TAssistant",
		icon: "fas fa-users",
		name: {
			"zh-cn": "我的分组",
			"en-us": "Assign Group",
		},
		show: false,
	},
	PendingApp: {
		role: "TAssistant",
		icon: "fas fa-file-import",
		name: {
			"zh-cn": "待审核申请",
			"en-us": "Pending App.",
		},
		show: false,
	},
	Analytics: {
		role: "WebAdmin",
		icon: "fas fa-chart-pie",
		name: {
			"zh-cn": "统计分析",
			"en-us": "Site analytics",
		},
		show: false,
	},
	PrivMgn: {
		role: "WebAdmin",
		icon: "fas fa-users-cog",
		name: {
			"zh-cn": "权限管理",
			"en-us": "Priv. manage",
		},
		show: false,
	},
};
</script>


<style scoped>
#SideBar {
	box-sizing: border-box;
	/* Positioning */
	left: 0;
	bottom: 0;
	width: var(--SideBarWidth);
	height: calc(100vh - var(--TitleBarHeight));
	/* Layout */
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0;
	/* Appearance */
	border-right: 1px solid #cccccc;
}

.roleWrapper div {
	padding: 0.5em var(--Padding);
	width: 100%;
	box-sizing: border-box;
}

.roleName {
	color: var(--gray);
	margin-top: 1em;
	text-align: left;
	font-size: 0.9em;
}

.SideBarEntry {
	color: var(--accent-dark);
	display: flex;
	align-items: center;
	font-size: 1.1em;
	border-right: 0.3em solid transparent;
}

.SideBarEntry:not(.active):hover {
	background-color: rgba(0, 0, 0, 0.08)
}

.SideBarEntry:not(.active):active {
	background-color: rgba(0, 0, 0, 0.12)
}

.SideBarEntry.active {
	background: var(--accent-light);
	border-right: 0.3em solid var(--accent);
	font-weight: bold;
}
</style>