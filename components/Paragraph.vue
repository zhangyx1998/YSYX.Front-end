<script setup>
defineProps({
	text: String,
});
</script>

<template>
	<div ref="el"></div>
</template>

<script>
export default {
	methods: {
		update(text) {
			this.$refs.el.innerText = text;
		},
	},
	watch: {
		text(text, oldText) {
			this.update(text);
		},
	},
	mounted() {
		this.update(this.text);
	}
};
</script>

<style>
:root {
	--paragraph-color-default: var(--gray-brighter);
	--paragraph-color-hover: var(--accent-bright);
}
</style>

<style scoped>
div {
	user-select: text;
	padding: 0 0.6em;
	margin: 0.5em 0;
	user-select: text;
	border-left: 0.2em solid var(--paragraph-color-default);
	line-height: 150%;
}

div * {
	user-select: text;
	display: block;
}

div:hover {
	background-color: rgba(0, 0, 0, 0.03);
	border-left: 0.2em solid var(--paragraph-color-hover);
}
</style>