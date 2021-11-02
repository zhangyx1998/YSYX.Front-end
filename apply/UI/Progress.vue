<script setup>
defineProps({
	step: Number,
	steps: Array,
});
</script>

<template>
	<div Progress ref="progress">
		<template v-for="(name, i) in steps" :key="i">
			<div :ref="`${i + 1}`" class="line" v-if="i"></div>
			<span class="node-warpper" :class="step >= i + 1 ? 'solid' : ''">
				<span class="node">
					<span>{{ i + 1 }}</span>
				</span>
				<span class="description">{{ intl(name) }}</span>
			</span>
		</template>
		<div ProgressBar :style="progressBar"></div>
	</div>
</template>

<script>
import { intl } from "/util/env.js";
export default {
	emits: ["update-height"],
	data() {
		return {
			progressBar: {
				display: "none",
			},
		};
	},
	methods: {
		intl,
	},
	watch: {
		step(val) {
			console.log(this.$refs);
			if (val > 1) {
				this.progressBar.width =
					this.$refs[val].offsetLeft +
					this.$refs[val].offsetWidth -
					this.$refs[2].offsetLeft +
					"px";
			} else {
				this.progressBar.width = "0px";
			}
		},
	},
	mounted() {
		this.$emit("update-height", this.$refs.progress.offsetHeight);
		this.progressBar = {
			left: this.$refs[2].offsetLeft + "px",
			top: this.$refs[2].offsetTop + "px",
			height: this.$refs[2].offsetHeight + "px",
		};
	},
};
</script>
<style scoped>
* {
	transition: var(--animation-duration) var(--animation-curve);
}

[Progress] {
	pointer-events: none;
	/* Position */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	/* Layout */
	display: flex;
	justify-content: center;
	align-items: center;
	padding: var(--padding) var(--padding-large);
	padding-top: 0.5em;
	padding-bottom: 2em;
	/* Appearance */
	background-color: var(--white);
}

.line {
	z-index: -2;
	flex-grow: 1;
	background-color: var(--gray-brighter);
	height: 0.1em;
}

.node-warpper {
	display: block;
	width: 1.6em;
	height: 1.6em;
	overflow: visible;
}

.node {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: var(--gray-brighter);
	/* Appearance */
	font-weight: 600;
	color: var(--white);
}

.description {
	display: block;
	font-size: 0.6em;
	font-weight: 600;
	color: var(--gray-brighter);
	margin: 0.5em -2em;
	text-align: center;
}

.solid .node {
	background-color: var(--accent);
}

.solid .description {
	color: var(--accent);
}

.solid * {
	transition-duration: var(--animation-duration-short);
	transition-delay: var(--animation-duration-short);
}
/* ProgressBar */
[ProgressBar] {
	position: absolute;
	z-index: -1;
	background-color: var(--accent);
}
</style>