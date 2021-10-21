<script setup>
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
	validate: Function,
	value: String,
});
</script>

<template>
	<Responsive lighter Entry>
		<div title><slot></slot></div>
		<div EntryVal>
			<input :value="value" disabled />
		</div>
		<div lighter EntryAction>
			<i class="fas fa-pen-square"></i>
		</div>
	</Responsive>
</template>