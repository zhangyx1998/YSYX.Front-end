<script setup>
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
	display: String,
});
</script>

<template>
	<div NaviBar>
		<Responsive
			v-for="(el, ID, i) in entries"
			:key="ID"
			@click="select(ID, i)"
			:class="active(ID)"
		>
			<i :class="el.icon[active(ID)]"></i>
			<span>{{ el.name[locale.$] }}</span>
		</Responsive>
	</div>
</template>

<script>
import { locale } from "/util/locale.js";

export default {
	emits: ["switch", "slide-to"],
	data() {
		return {
			locale,
			order: null,
			entries: {
				Forum: {
					icon: {
						active: "fas fa-compass",
						inactive: "far fa-compass",
					},
					name: {
						"en-US": "Forum",
						"zh-CN": "论坛",
					},
				},
				Posts: {
					icon: {
						active: "fas fa-bell",
						inactive: "far fa-bell",
					},
					name: {
						"en-US": "Posts",
						"zh-CN": "公告",
					},
				},
				Tasks: {
					icon: {
						active: "fas fa-layer-group",
						inactive: "fas fa-layer-group",
					},
					name: {
						"en-US": "My Tasks",
						"zh-CN": "我的任务",
					},
				},
				Account: {
					icon: {
						active: "fas fa-user-alt",
						inactive: "fas fa-user-alt",
					},
					name: {
						"en-US": "Account",
						"zh-CN": "个人信息",
					},
				},
			},
		};
	},
	methods: {
		active(ID) {
			return ID === this.display ? "active" : "inactive";
		},
		select(val, i) {
			this.order = i;
			if (val !== this.display) this.$emit("switch", val);
		},
	},
	watch: {
		order(newVal, oldVal) {
			if (oldVal !== null && newVal !== oldVal) {
				this.$emit('slide-to', newVal > oldVal ? 'left' : 'right');
			}
		}
	},
	mounted() {
		this.order = Object.keys(this.entries).indexOf(this.display);
	}
};
</script>


<style scoped>
[NaviBar] {
	/* Positioning */
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: var(--mobile-navibar-height);
	/* Appearance */
	background-color: white;
	border-top: 0.06em solid var(--gray-brighter);
	/* Layout */
	display: flex;
	align-items: center;
	justify-content: space-around;
}

[NaviBar] > * {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 5em;
	font-weight: 400;
	font-size: 0.75em;
	transition: background-color 0.2s ease-out;
	transition-delay: background-color 0.1s;
	padding-bottom: var(--mobile-bottom-safearea);
}

[NaviBar] > *.inactive > * {
	opacity: 0.8;
	color: var(--gray);
}

[NaviBar] > *.active > * {
	opacity: 1;
	color: var(--accent);
}

[NaviBar] i {
	font-size: 1.8em;
	margin-bottom: 0.2em;
}
</style>