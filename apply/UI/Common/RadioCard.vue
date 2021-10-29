<script setup>
import Responsive from '/components/Responsive.vue';
</script>

<template>
	<Responsive class="container">
		<div class="name-container">
			<span><slot name="title"></slot></span>
		</div>
		<div class="des-container">
			<slot name="content"></slot>
		</div>
	</Responsive>
</template>

<style scoped>
.container {
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
.des-container{
	font-size: 0.8em;
	color: var(--accent-dark);
	margin: var(--padding-small) 0;
}
</style>