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
	display: flex;
	align-items: center;
}
span{
	font-size: 0.8em;
}
.fas,
.far {
	margin-right: 0.3em;
	color: var(--gray-dark);
}
</style>