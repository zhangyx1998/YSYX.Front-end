<script setup>
defineProps({
	display: String
})
</script>

<template>
	<div NaviBar>
		<div
			v-for="(el, ID) in entries"
			:key="ID"
			@click="
				select(ID);
				flush_touch();
			"
			@touchstart="flush_touch(); el.touch = true"
			@mousedown="flush_touch(); el.touch = true"
			@touchcancel="flush_touch()"
			@abort="flush_touch()"
			:class="[active(ID), el.touch ? 'touch-down' : '']"
		>
			<i :class="el.icon[active(ID)]"></i>
			<span>{{ el.name[locale.$] }}</span>
		</div>
	</div>
</template>

<script>
import { locale } from "/util/locale.js";

export default {
	data() {
		return {
			locale,
			entries: {
				Forum: {
					touch: false,
					icon: {
						active: "fas fa-compass",
						inactive: "far fa-compass",
					},
					name: {
						"en-US": "Forum",
						"zh-CN": "论坛",
					},
				},
				Tasks: {
					touch: false,
					icon: {
						active: "fas fa-layer-group",
						inactive: "fas fa-layer-group",
					},
					name: {
						"en-US": "My Tasks",
						"zh-CN": "我的任务",
					},
				},
				UserInfo: {
					touch: false,
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
		select(val) {
			if (val !== this.display)
				this.$emit("switch", val);
		},
		flush_touch() {
			for (const el in this.entries) {
				this.entries[el].touch = false;
			}
		}
	},
	emits: ["switch"],
};
</script>


<style scoped>
[NaviBar] {
	/* Positioning */
	position: fixed;
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
	color: var(--gray);
	font-weight: 400;
	opacity: 0.8;
	font-size: 0.75em;
	transition: background-color .2s ease-out;
	transition-delay: background-color .1s;
	padding-bottom: var(--mobile-bottom-safearea);
}

[NaviBar] > .touch-down {
	transition: background-color .1s;
	transition-delay: background-color 0s;
	background-color: var(--gray-brighter);
}

[NaviBar] > *.active,
[NaviBar] > *.touch-down {
	opacity: 1;
	color: var(--accent);
}

[NaviBar] i {
	font-size: 1.8em;
	margin-bottom: 0.2em;
}

/* Navigation bar animation */
.poster > [NaviBar] {
	transform: translateY(100%);
}

:not(.poster) > [NaviBar] {
	animation-name: popup;
	animation-duration: var(--load-animation-duration);
	animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes popup {
	from {
		transform: translateY(100%);
	}

	to {
		transform: none;
	}
}
</style>