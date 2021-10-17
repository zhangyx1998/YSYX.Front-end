<script setup>
defineProps({
	panes: Object,
	defaultPane: String,
});
</script>

<template>
	<span warpper ref="el" @resize="emitHeight">
		<div PaneSelector :class="platform == 'mobile' ? 'shadow' : ''">
			<span v-for="(val, ID) in panes" :key="ID">
				<div
					:class="['Option', display == ID ? 'active' : '']"
					@click="
						display = ID;
						$emit('select', ID);
					"
				>
					<span zh-CN>{{ val.name["zh-CN"] }}</span>
					<span en-US>{{ val.name["en-US"] }}</span>
				</div>
			</span>
		</div>
	</span>
</template>

<script>
import { platform } from "/space/UI/App.vue";

export default {
	emits: ["select", "inner-height"],
	data() {
		return {
			platform,
			display: (() => {
				if (
					typeof this.defaultPane === "string" &&
					this.defaultPane in this.panes
				) {
					return this.defaultPane;
				} else {
					for (const ID in this.panes) {
						return ID;
					}
				}
			})(),
		};
	},
	methods: {
		emitHeight() {
			if (platform == "mobile")
				this.$emit("inner-height", this.$refs.el.offsetHeight);
		},
	},
	mounted() {
		this.$emit("select", this.display);
		this.emitHeight();
	},
	activated() {
		console.log(this);
	},
};

export function $select(app, name) {
	if ("display" in app) {
		app.display = name;
	} else {
		console.error(
			'Expecting property "display" in panselector implementation'
		);
	}
}
</script>


<style scoped>
[PaneSelector] {
	/* Layout */
	display: flex;
	align-items: center;
	justify-content: center;
	/* Apperance */
	background: var(--gray-light);
}

.desktop [PaneSelector] {
	/* Positioning */
	position: relative;
	width: 100%;
	/* Apperance */
	border-bottom: 0.08em inset var(--gray-brighter);
}

.desktop [warpper] {
	width: 100%;
}

.mobile [PaneSelector] {
	pointer-events: all;
	/* Layout */
	overflow: hidden;
	margin-bottom: var(--padding);
	/* Apperance */
	border-radius: 2em;
	border: 1px solid var(--gray-brighter);
}
.mobile [warpper] {
	pointer-events: none;
	/* Positioning */
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2000;
	/* Layout */
	display: flex;
	justify-content: center;
	padding: var(--padding) 0 var(--mobile-bottom-safearea) 0;
	/* Appearence */
	background: rgba(255, 255, 255, 0.5);
	background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.6) 25%,
		rgba(255, 255, 255, 1) 100%
	);
}
/* Option buttons */
.desktop .Option {
	cursor: pointer;
	color: var(--gray);
	padding: 0.5em 0.6em;
	margin: 0 0.3em -0.08em 0.3em;
	border-bottom: 0.15em solid transparent;
}
.desktop .Option:hover {
	background: rgba(0, 0, 0, 0.04);
	border-bottom: 0.15em solid var(--gray-bright);
}
.desktop .Option:active {
	background: rgba(0, 0, 0, 0.06);
	border-bottom: 0.15em solid var(--gray-bright);
}
.desktop .Option.active {
	cursor: default;
	color: var(--accent);
	border-bottom: 0.15em solid var(--accent);
}
.mobile .Option {
	cursor: pointer;
	color: var(--gray);
	padding: 0.8em 1em;
	margin: 0;
	flex-grow: 1;
	transition-delay: 100ms;
	transition: 0.2s ease-out;
}
.mobile .Option:active {
	transition-delay: 0ms;
	transition: 0.1s ease-in;
	background: rgba(0, 0, 0, 0.08);
}
.mobile .Option.active {
	cursor: default;
	color: var(--accent);
	/* Appearence */
	background: rgba(0, 0, 0, 0.05);
}
</style>