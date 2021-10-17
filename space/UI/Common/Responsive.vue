<template>
	<div
		style="position: relative;"
		@click="touch = false"
		@touchstart="touch = true"
		@mousedown="touch = true"
		@touchcancel="touch = false"
		@touchleave="touch = false"
		:class="[touch ? 'touch-down' : 'touch-up']"
	>
		<div overlay></div>
		<slot @blur="touch = false"></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			touch: false,
		};
	},
};
</script>

<style scoped>
[overlay] {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	pointer-events: none;
}

.touch-up > [overlay] {
	transition: .2s;
	transition-delay: .1s;
	background-color: transparent;
}

.touch-down > [overlay] {
	transition: .1s;
	background-color: hsla(0, 0%, 0%, 0.04);
}
</style>
