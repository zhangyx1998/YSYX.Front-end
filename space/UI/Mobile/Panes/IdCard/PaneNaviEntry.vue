<script setup>
import Responsive from "/components/Responsive.vue";
</script>

<template>
	<Responsive lighter Entry>
		<div EntryVal style="line-height: 2.6em">
			<slot></slot>
		</div>
		<div EntryAction>
			<div>
				<i class="fas fa-chevron-right"></i>
			</div>
		</div>
	</Responsive>
</template>

<style scoped>
@import "./index.css";
</style>