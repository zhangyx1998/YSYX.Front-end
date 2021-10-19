<script setup>
import Entry from "./Tasks/Entry.vue";
</script>

<template>
	<div Content>
		<span
			group
			v-for="(role, roleName) in Roles"
			:key="roleName"
			w100
			v-show="role.show"
		>
			<div title v-if="role.show" en-US>{{ role["en-US"] }}</div>
			<div title v-if="role.show" zh-CN>{{ role["zh-CN"] }}</div>
			<div action-group>
				<span v-for="(el, moduleID) in ModuleInfo" :key="moduleID">
					<Entry
						v-if="el.show && el.role === roleName"
						:el="el"
						@click="$emit('show-pane', moduleID)"
					/>
				</span>
			</div>
		</span>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Roles, ModuleInfo } from "/space/ModuleInfo.json";

export default {
	emits: ["show-pane"],
	data() {
		return {
			ModuleInfo,
			Roles,
		};
	},
	methods: {
		openPane(moduleID) {
			if (moduleID in Modules) showPane(Modules[moduleID]);
			else showPane(PlaceHolder);
		},
		load(Modules) {
			for (const module in this.ModuleInfo) {
				const show = Modules.indexOf(module) >= 0;
				this.ModuleInfo[module].show = show;
				const role = this.ModuleInfo[module].role;
				this.Roles[role].show ||= show;
			}
			this.$forceUpdate();
		},
	},
	computed: {
		roleList() {
			return Object.keys(this.Roles).filter(
				(el) => el in this.ModuleInfo && this.ModuleInfo[el].show
			);
		},
	},
	created() {
		console.log(this);
		Session.on("login", () => {
			Session.post("Modules").then(({ Modules }) => this.load(Modules));
		});
	},
	activated() {
		Session.post("Modules").then(({ Modules }) => this.load(Modules));
	},
};
</script>

<style scoped>
[group] {
	display: block;
	margin-bottom: 0.8em;
}

[group] > [title] {
	margin-bottom: 0.6em;
	padding: 0 0.5em;
	font-size: 0.8em;
	color: var(--gray);
	font-weight: 500;
}

[action-group] {
	overflow: hidden;
	border-radius: 0.4em;
	/* border: 0.06px solid var(--gray-brighter); */
	background-color: white;
	margin: -1px;
}
</style>