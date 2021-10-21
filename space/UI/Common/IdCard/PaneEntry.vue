<script setup>
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
	validate: Function,
	value: String,
});
</script>

<template>
	<div Entry>
		<div EntryVal>
			<input :value="value" disabled/>
		</div>
		<Responsive lighter EntryAction>
			<i class="far fa-chevron-right"></i>
		</Responsive>
	</div>
</template>