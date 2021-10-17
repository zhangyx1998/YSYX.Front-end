<script setup>
defineProps({
	type: String,
	icon: String,
	name: String,
});
</script>

<template>
	<div
		button
		:class="type"
		@keydown.enter="$emit('click')"
		@mousedown="mouseDown"
		@focus="focus"
		:tabindex="!disabled ? '0' : ''"
		ref="el"
	>
		<i
			v-if="icon"
			:class="icon"
			style="font-size: 1.1em;"
			:style="name ? {'margin-right': '0.3em'} : {}"
		></i>
		<span
			style="
				display: inline-flex;
				font-size: 0.9em;
				padding: 0;
				margin: 0;
			"
			>{{ name }}</span
		>
		<span style="display: hidden" tabindex="-1" ref="pseudo"></span>
	</div>
</template>

<script>
let _focus_by_mouse_ = false;
export default {
	methods: {
		focus() {
			if (_focus_by_mouse_) {
				this.$refs.pseudo.focus();
			}
			_focus_by_mouse_ = false;
		},
		mouseDown() {
			_focus_by_mouse_ = true;
			this.$refs.pseudo.focus();
		},
	},
	computed: {
		disabled() {
			return (
				(Array.isArray(this.type)
					? this.type
					: this.type.split(" ")
				).indexOf("disabled") >= 0
			);
		},
	},
};
</script>

<style>
:root {
	/* Default values */
	--button-margin: 0.4em;
	--button-padding: 0.4em 0.6em;
	--button-focus-outline-color: var(--accent-bright);
}

:root {
	/* Default values */
	--button-margin: 0.4em;
	--button-padding: 0.4em 0.6em;
	--button-focus-outline-color: var(--accent-bright);
}
</style>

<style scoped>
[button] {
	/* Appearence */
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	border-radius: 0.2em;
	margin: var(--button-margin);
	padding: var(--button-padding);
}

[button] > * {
	display: flex;
}

[button]:focus {
	outline-style: solid;
	outline-width: 2px;
	outline-color: var(--button-focus-outline-color);
}
/* seamless */
[button].seamless:not(.disabled):hover {
	background-color: rgba(0, 0, 0, 0.1);
}
[button].seamless:not(.disabled):active {
	background-color: rgba(0, 0, 0, 0.2);
}

[button].seamless.white {
	color: white;
}
[button].seamless.white:not(.disabled):hover {
	background-color: rgba(255, 255, 255, 0.1);
}
[button].seamless.white:not(.disabled):active {
	background-color: rgba(255, 255, 255, 0.2);
}
/* solid */
[button].solid,
[button].outlined {
	font-weight: 500;
	line-height: 1em;
	border-radius: 6px;
	border: 0.08em solid var(--borderPrime);
	background-color: var(--color-Prime);
}

[button].solid:not(.disabled):hover,
[button].outlined:not(.disabled):hover {
	border: 0.08em solid var(--borderHover);
	background-color: var(--color-Hover);
}

[button].solid:not(.disabled):active,
[button].outlined:not(.disabled):active {
	border: 0.08em solid var(--borderPress);
	background-color: var(--color-Press);
}
/* solid green */
[button].solid.green {
	color: white;
	--color-Prime: hsl(132, 48%, 36%);
	--color-Hover: hsl(132, 44%, 40%);
	--color-Press: hsl(132, 42%, 44%);
	--borderPrime: hsl(132, 48%, 36%);
	--borderHover: hsl(132, 44%, 40%);
	--borderPress: hsl(132, 42%, 44%);
	--button-focus-outline-color: hsl(40, 100%, 50%);
}
/* solid blue */
[button].solid.blue {
	color: white;
	--color-Prime: hsl(217, 48%, 36%);
	--color-Hover: hsl(217, 44%, 40%);
	--color-Press: hsl(217, 42%, 44%);
	--borderPrime: hsl(217, 48%, 36%);
	--borderHover: hsl(217, 44%, 40%);
	--borderPress: hsl(217, 42%, 44%);
	--button-focus-outline-color: hsl(40, 100%, 50%);
}
/* solid red */
[button].solid.red {
	color: white;
	--color-Prime: hsl(0, 48%, 36%);
	--color-Hover: hsl(0, 44%, 40%);
	--color-Press: hsl(0, 42%, 44%);
	--borderPrime: hsl(0, 48%, 36%);
	--borderHover: hsl(0, 44%, 40%);
	--borderPress: hsl(0, 42%, 44%);
	--button-focus-outline-color: hsl(40, 100%, 50%);
}
/* outlined red */
[button].outlined.red {
	color: hsl(0, 48%, 36%);
	--color-Prime: hsla(0, 48%, 36%, 0);
	--color-Hover: hsla(0, 44%, 40%, 0.04);
	--color-Press: hsla(0, 42%, 44%, 0.02);
	--borderPrime: hsla(0, 48%, 36%, 0.4);
	--borderHover: hsla(0, 44%, 40%, 1);
	--borderPress: hsla(0, 42%, 44%, 0.8);
	--button-focus-outline-color: hsl(40, 100%, 50%);
}
/* solid gray */
[button].solid.gray {
	color: white;
	color: white;
	--color-Prime: hsl(0, 0%, 36%);
	--color-Hover: hsl(0, 0%, 40%);
	--color-Press: hsl(0, 0%, 44%);
	--borderPrime: hsl(0, 0%, 36%);
	--borderHover: hsl(0, 0%, 40%);
	--borderPress: hsl(0, 0%, 44%);
}
/* outlined gray */
[button].outlined.gray {
	color: hsla(0, 0%, 0%, 0.48);
	--color-Prime: hsla(0, 0%, 0%, 0.08);
	--color-Hover: hsla(0, 0%, 0%, 0.06);
	--color-Press: hsla(0, 0%, 0%, 0.04);
	--borderPrime: hsla(0, 0%, 0%, 0.12);
	--borderHover: hsla(0, 0%, 0%, 0.48);
	--borderPress: hsla(0, 0%, 0%, 0.3);
}
/* link */
[button].link {
	padding-left: 0;
	padding-right: 0;
	text-decoration: underline;
	color: var(--gray-bright);
}
[button].link:not(.disabled):hover {
	color: var(--gray-dark);
}
/* disabled */
[button].disabled {
	cursor: not-allowed;
}
</style>