<script setup>
import Responsive from "/space/UI/Common/Responsive.vue";
</script>

<template>
	<div>
		<Responsive class="container">
			<div class="name-container">
				<span><slot name="content"></slot></span>
			</div>
		</Responsive>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	margin-top: 1em;
	border-radius: 1em;
	border-width: 1.6px;
	border-style: solid;
	display: block;
	padding: var(--padding-small);
}

.name-container {
	font-size: 1.1em;
}
</style>