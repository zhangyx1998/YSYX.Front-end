<script setup>
import { env } from "/util/env.js";
defineProps({
	title: String,
	animation: String,
	poster: Boolean,
});
</script>

<template>
	<div TitleBar ref="TitleBar" v-if="env.platform == 'mobile'">
		<div navi style="justify-content: flex-start">
			<slot name="left"></slot>
		</div>
		<div title>
			<transition :name="animation">
				<img id="YSYX_MONO" v-show="!title" src="/res/YSYX_Mono.png" />
			</transition>
			<img id="YSYX_COLOR" src="/res/YSYX.png" />
		</div>
		<transition :name="animation">
			<span title-alt v-if="!!title" :key="title">{{ title }}</span>
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
	text-align: center;
	position: relative;
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
	transform: scale(1.6);
	animation: fade-in var(--poster-animation-duration) var(--animation-curve);
}

.poster-leave [title],
.poster-leave [title] img {
	transition-duration: var(--poster-animation-duration);
	transition-timing-function: var(--animation-curve);
}

#YSYX_COLOR {
	position: absolute;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;
	opacity: 0;
}

.poster #YSYX_COLOR,
.poster-leave #YSYX_COLOR {
	opacity: 1;
}

.poster #YSYX_MONO {
	opacity: 0;
}

@keyframes fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}
</style>