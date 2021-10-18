<script setup>
import Button from "/space/UI/Common/Button.vue";
defineProps({
	title: String,
	suffix: String,
	buttons: Array,
});
</script>

<template>
	<div Content _1024_>
		<h1 w100 style="font-weight: 200">{{ title }}</h1>
		<h3 w100>{{ suffix }}</h3>
		<div style="flex-direction: row">
			<Button
				v-for="(button, i) in buttons"
				:key="i"
				:type="button.type"
				:icon="button.icon"
				:name="button.name"
				@click="button.callback()"
			/>
		</div>
	</div>
</template>

<style scoped>
[Content] {
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: center;
	justify-content: center;
}
h1,
h2,
h3,
h4,
p {
	display: block;
	color: var(--color-text) !important;
	text-align: center;
}
</style>