<script setup>
import Button from "/space/UI/Common/Button.vue";
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
	validate: Function,
	value: String,
});
</script>

<template>
	<div Entry>
		<div EntryVal>
			<div title><slot></slot></div>
			<input
				ref="input"
				:value="value"
				:style="{ 'pointer-events': focus ? 'all' : 'none' }"
				@focus="focus = true"
				@blur="focus = false"
				@keydown.enter="update()"
			/>
		</div>
		<div EntryAction>
			<Responsive lighter @click="this.$refs.input.focus()">
				<i class="fas fa-pen-square"></i>
			</Responsive>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			focus: false,
			editing: false
		};
	},
	watch: {
		focus(focused) {
			if (focused) this.editing = true;
		},
	}
};
</script>
