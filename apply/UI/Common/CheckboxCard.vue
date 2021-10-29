<script setup>
import Responsive from "/components/Responsive.vue";
defineProps({
	isSelected: Boolean,
});
</script>

<template>
	<div>
		<Responsive class="container">
			<span class="fas fa-check-square" v-if="isSelected"></span>
			<span class="far fa-square" v-else></span>
			<div class="name-container">
				<span><slot></slot></span>
			</div>
		</Responsive>
	</div>
</template>

<style scoped>
.container {
	height: 1.5em;
	display: flex;
	align-items: center;
}

span.fas,
span.far {
	margin-right: 0.3em;
	color: var(--gray-dark);
}

.name-container {
}
</style>