<script setup>
import { env } from "/util/env.js";
defineProps({
	title: String,
	animation: String,
	poster: Boolean,
});
</script>

<template>
	<div TitleBar ref="TitleBar" v-if="true">
		<div navi style="justify-content: flex-start">
			<slot name="left"></slot>
		</div>
		<div title>
			<transition :name="animation">
				<img v-show="!title" src="/res/YSYX.png" />
			</transition>
		</div>
		<transition :name="animation">
			<span
				title-alt
				v-if="!!title"
				:key="title"
				>{{ title }}</span
			>
		</transition>
		<div navi style="justify-content: flex-end">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<style scoped>
h1 {
	color: white;
	font-size: 2rem;
}

.Desktop [TitleBar] {
	display: none;
}

[TitleBar] {
	/* Positioning */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	/* Sizing */
	width: 100%;
	/* Appearance */
	background-color: var(--accent);
	/* Layout */
	z-index: 2000;
	display: flex;
	align-items: center;
	justify-content: center;
	height: var(--mobile-titlebar-height);
}

[navi] {
	padding: var(--padding-small);
	height: 100%;
	display: flex;
	flex-direction: row;
	width: 0;
	overflow: visible;
	flex-grow: 1;
	--button-margin: 0;
	--button-padding: 0.2em 0.4em;
}

/* TitleBar animation */
.poster[TitleBar],
.poster-leave[TitleBar] {
	height: 100%;
	background-color: white;
}

.poster-leave[TitleBar] {
	animation-name: uncover;
	animation-duration: var(--poster-animation-duration);
	animation-timing-function: var(--animation-curve);
}

@keyframes uncover {
	from {
		height: 100%;
		background-color: white;
	}

	to {
		height: var(--mobile-titlebar-height);
		background-color: var(--accent);
	}
}

/* TitleBar LOGO image animation */
[title] {
	height: 1.4em;
	filter: brightness(100) saturate(0);
	text-align: center;
}

[title-alt] {
	pointer-events: none;
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	left: 0;
	color: white;
	font-size: 1.2em;
}

img {
	height: 100%;
}

.poster [title] {
	filter: none;
	transform: scale(1.6);
	/* Fade in */
	animation-name: fade-in;
	animation-duration: 0.5s;
	animation-timing-function: var(--animation-curve);
}

.poster-leave [title] {
	animation-name: scale;
	animation-duration: var(--poster-animation-duration);
	animation-timing-function: var(--animation-curve);
}

@keyframes fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes scale {
	from {
		filter: none;
		transform: scale(1.6);
	}

	10% {
		filter: brightness(1) saturate(0.2);
	}

	30% {
		filter: brightness(10) saturate(0.1);
	}

	60% {
		filter: brightness(60) saturate(0);
	}

	to {
		filter: brightness(100) saturate(0);
		transform: none;
	}
}
</style>