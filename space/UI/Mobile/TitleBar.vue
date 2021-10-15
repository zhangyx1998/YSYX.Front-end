<script setup>
import Button from "/space/UI/Common/Button.vue";
defineProps({
	left: Object,
	right: Object,
	title: String,
});
</script>

<template>
	<div TitleBar ref="TitleBar">
		<div navi :B="(B = left)" style="justify-content: left;">
			<Button
				v-if="left && left !== null"
				:name="B.name"
				:icon="B.icon"
				:type="B.type"
				@click="B.callback"
			/>
		</div>
		<h1 v-if="title">{{ title }}</h1>
		<img v-else src="/res/YSYX.png" />
		<div navi :B="(B = right)" style="justify-content: right;">
			<Button
				v-if="right && right !== null"
				:name="B.name"
				:icon="B.icon"
				:type="B.type"
				@click="B.callback"
			/>
		</div>
	</div>
</template>

<style scoped>
h1 {
	color: white;
	font-size: 2rem;
}

/* TitleBar animation */
[TitleBar] {
	/* Positioning */
	position: fixed;
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
	padding: 0.8em var(--padding);
	height: var(--mobile-titlebar-height);
	animation-duration: var(--load-animation-duration);
	animation-timing-function:var(--load-animation-curve);
}

[navi] {
	display: flex;
	flex-direction: row;
	width: 0;
	overflow: visible;
	flex-grow: 1;
	--button-margin: 0;
	--button-padding: 0.2em 0.4em;
}

.poster > [TitleBar] {
	height: 100%;
	background-color: white;
}

.poster-leave > [TitleBar] {
	animation-name: uncover;
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

.poster > [TitleBar] img {
	filter: none;
	transform: scale(1.6);
	/* Fade in */
	animation-name: fade-in;
	animation-duration: 0.5s;
	animation-timing-function:var(--load-animation-curve);
}

.poster-leave > [TitleBar] img {
	animation-name: scale;
	animation-duration: var(--load-animation-duration);
	animation-timing-function:var(--load-animation-curve);
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

	30% {
		filter: brightness(1) saturate(0);
	}

	to {
		filter: brightness(100) saturate(0);
		transform: none;
	}
}
</style>