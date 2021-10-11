<script setup>
import Entry from "./SideBar/Entry.vue";
</script>

<template>
	<div id="SideBar" class="UI-Top">
		<div
			v-for="(role, roleName) in roles"
			:key="roleName"
			style="width: 100%"
		>
			<div class="roleWrapper" v-if="role.show">
				<div class="roleName" en-US>{{ role["en-US"] }}</div>
				<div class="roleName" zh-CN>{{ role["zh-CN"] }}</div>
				<span v-for="(el, moduleID) in LUT" :key="moduleID">
					<Entry
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
					"zh-CN": "站点管理",
					"en-US": "Site Admin",
				},
				TAssistant: {
					show: false,
					"zh-CN": "项目管理",
					"en-US": "Project Admin",
				},
				Participant: {
					show: false,
					"zh-CN": "参与项目",
					"en-US": "Participant",
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
			"zh-CN": "项目规划",
			"en-US": "Study Plan",
		},
		show: false,
	},
	ProgressReport: {
		role: "Participant",
		icon: "fas fa-tasks",
		name: {
			"zh-CN": "进度记录",
			"en-US": "Prog. Report",
		},
		show: false,
	},
	Analytics: {
		role: "TAssistant",
		icon: "fas fa-chalkboard-teacher",
		name: {
			"zh-CN": "讲座管理",
			"en-US": "Lecture Mgn",
		},
		show: false,
	},
	PendingRequest: {
		role: "TAssistant",
		icon: "fab fa-buffer",
		name: {
			"zh-CN": "待处理请求",
			"en-US": "Pending Req.",
		},
		show: false,
	},
	ProgressInspect: {
		role: "TAssistant",
		icon: "fas fa-calendar-check",
		name: {
			"zh-CN": "学生进度检查",
			"en-US": "Prog. Inspect",
		},
		show: false,
	},
	GroupAssignment: {
		role: "TAssistant",
		icon: "fas fa-users",
		name: {
			"zh-CN": "我的分组",
			"en-US": "Assign Group",
		},
		show: false,
	},
	PendingApp: {
		role: "TAssistant",
		icon: "fas fa-file-import",
		name: {
			"zh-CN": "待审核申请",
			"en-US": "Pending App.",
		},
		show: false,
	},
	Analytics: {
		role: "WebAdmin",
		icon: "fas fa-chart-pie",
		name: {
			"zh-CN": "统计分析",
			"en-US": "Site analytics",
		},
		show: false,
	},
	PrivMgn: {
		role: "WebAdmin",
		icon: "fas fa-users-cog",
		name: {
			"zh-CN": "权限管理",
			"en-US": "Priv. manage",
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
	padding: 0.5em var(--padding);
	width: 100%;
	box-sizing: border-box;
}

.roleName {
	color: var(--gray);
	margin-top: 1em;
	text-align: left;
	font-size: 0.9em;
}

.Entry {
	color: var(--gray);
	display: flex;
	align-items: center;
	font-size: 1.1em;
	font-weight: 400;
	border-right: 0.3em solid transparent;
}

.Entry:not(.active):hover {
	background-color: rgba(0, 0, 0, 0.08)
}

.Entry:not(.active):active {
	background-color: rgba(0, 0, 0, 0.12)
}

.Entry.active {
	color: var(--accent-dark);
	background: var(--accent-light);
	border-right: 0.3em solid var(--accent);
}
</style>