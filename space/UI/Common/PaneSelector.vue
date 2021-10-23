<script setup>
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
	panes: Object,
	defaultPane: String,
});
</script>

<template>
	<span warpper ref="el" @resize="emitHeight">
		<div PaneSelector :class="env.platform == 'mobile' ? 'shadow' : ''">
			<div animate-under-line :style="underline">
				<div :class="env.platform == 'mobile' ? 'shadow' : ''"></div>
			</div>
			<span v-for="(val, ID, i) in panes" :key="ID" :ref="ID">
				<Responsive
					:class="['Option', display == ID ? 'active' : '']"
					@click="select(ID, i)"
				>
					<span zh-CN>{{ val.name["zh-CN"] }}</span>
					<span en-US>{{ val.name["en-US"] }}</span>
				</Responsive>
			</span>
		</div>
	</span>
</template>

<script>
import { env } from "/util/env.js";
export default {
	emits: ["select", "slide-to", "el-height"],
	data() {
		return {
			env,
			underline: {
				left: "0px",
				width: "0px",
			},
			display: "",
			focusEl: null,
			order: null,
		};
	},
	watch: {
		display(ID) {
			this.focusEl = this.$refs[ID].lastElementChild;
			this.relocate();
			this.$emit("select", ID);
		},
		order(newOrder, oldOrder) {
			if (oldOrder !== null)
				this.$emit("slide-to", newOrder >= oldOrder ? "left" : "right");
		},
	},
	methods: {
		relocate() {
			[this.underline.left, this.underline.width] = [
				this.focusEl.offsetLeft,
				this.focusEl.offsetWidth,
			].map((el) => `${el}px`);
		},
		select(ID, i) {
			ID =
				ID ||
				(() => {
					if (
						typeof this.defaultPane === "string" &&
						this.defaultPane in this.panes
					) {
						i = Object.keys(this.panes).indexOf(this.defaultPane);
						return this.defaultPane;
					} else {
						i = 0;
						for (const ID in this.panes) {
							return ID;
						}
					}
				})();
			this.order = i;
			this.display = ID;
		},
		emitHeight() {
			this.$emit("el-height", this.$refs.el.offsetHeight);
		},
	},
	mounted() {
		this.emitHeight();
		this.select();
		window.addEventListener('resize', this.relocate);
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
	position: relative;
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
	padding: 0 0.3em;
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
	z-index: 1000;
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
.Option {
	color: var(--gray);
}

.desktop .Option {
	cursor: pointer;
	padding: 0.5em 0.6em;
	margin: 0 0.3em -0.08em 0.3em;
}
.desktop .Option:hover {
	background: rgba(0, 0, 0, 0.04);
}
.desktop .Option.active {
	cursor: default;
	color: var(--accent);
}
.mobile .Option {
	padding: 0.8em 1em;
	margin: 0 -0.3em;
	border-radius: 2em;
	flex-grow: 1;
	transition-delay: 100ms;
	transition: 0.2s ease-out;
}
.mobile .Option.active {
	cursor: default;
	color: var(--white);
}

[animate-under-line] {
	pointer-events: none;
	transition-duration: var(--animation-duration-short);
	transition-timing-function: var(--animation-curve);
	position: absolute;
}

.mobile [animate-under-line] {
	padding: 0.2em;
	top: 0;
	bottom: 0;
}

.desktop [animate-under-line] {
	overflow: visible;
	bottom: 0;
	height: 0.16em;
	background-color: var(--accent);
	transform: translateY(0.04em);
}

[animate-under-line] > div {
	width: 100%;
	height: 100%;
}

.mobile [animate-under-line] > div {
	width: 100%;
	height: 100%;
	background-color: var(--accent);
	border-radius: 2em;
}
</style>