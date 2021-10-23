<script setup>
import Button from "/space/UI/Common/Button.vue";
</script>

<template>
	<Button
		type="seamless white"
		icon="fas fa-chevron-left"
		style="border-radius: 0.2em; min-width: 2em"
		@click="$emit('back')"
	/>
</template>


<script>
export default {
	emits: ['back'],
};
</script>