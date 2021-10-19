<script setup>
import { platform } from '/space/UI/App.vue';
defineProps({
	title: String,
});
</script>

<template>
	<div TitleBar ref="TitleBar" v-if="platform == 'mobile'">
		<div navi style="justify-content: left">
			<slot name="left"></slot>
		</div>
		<div
			v-if="title"
			style="color: white; font-size: 1.2em; font-weight: normal"
		>
			{{ title }}
		</div>
		<img v-else src="/res/YSYX.png" />
		<div navi style="justify-content: right">
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
[TitleBar] img {
	height: 1.6em;
	filter: brightness(100) saturate(0);
}

.poster[TitleBar] img {
	filter: none;
	transform: scale(1.6);
	/* Fade in */
	animation-name: fade-in;
	animation-duration: 0.5s;
	animation-timing-function: var(--animation-curve);
}

.poster-leave[TitleBar] img {
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