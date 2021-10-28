<script setup>
import Entry from "./SideBar/Entry.vue";
</script>

<template>
	<div id="SideBar" UI-Top>
		<div
			v-for="(role, roleName) in Roles"
			:key="roleName"
			style="width: 100%"
		>
			<div class="roleWrapper" v-if="role.show">
				<div class="roleName" en-US>{{ role["en-US"] }}</div>
				<div class="roleName" zh-CN>{{ role["zh-CN"] }}</div>
				<span v-for="(el, moduleID) in ModuleInfo" :key="moduleID">
					<Entry
						v-if="el.show && el.role === roleName"
						:el="el"
						:selected="moduleID === selected"
						@click="DesktopView.navigate(moduleID)"
					/>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { DesktopView } from "/space/View.js";
import { Roles, ModuleInfo } from "/space/ModuleInfo.json";

export default {
	data() {
		return {
			ModuleInfo: {...ModuleInfo},
			Roles:  {...Roles},
			selected: ""
		};
	},
	computed: {
		roleList() {
			return Object.keys(Roles).filter(
				(el) => el in ModuleInfo && ModuleInfo[el].show
			);
		},
	},
	created() {
		Session.on("login", () => {
			Session.post("Modules").then(({ Modules }) => {
				Session.data.Modules = Modules;
				for (const module in ModuleInfo) {
					const show = Modules.indexOf(module) >= 0;
					ModuleInfo[module].show = show;
					const role = ModuleInfo[module].role;
					Roles[role].show ||= show;
				}
				this.$forceUpdate();
			});
		});
		DesktopView.on("change", () => {
			this.selected = DesktopView.module;
			// this.$forceUpdate();
		});
	},
	activated() {
		console.log(this);
	}
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
	background-color: rgba(0, 0, 0, 0.08);
}

.Entry:not(.active):active {
	background-color: rgba(0, 0, 0, 0.12);
}

.Entry.active {
	color: var(--accent-dark);
	background: var(--accent-light);
	border-right: 0.3em solid var(--accent);
}
</style>