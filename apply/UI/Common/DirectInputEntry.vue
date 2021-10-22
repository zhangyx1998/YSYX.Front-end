<script setup>
import Button from "/space/UI/Common/Button.vue";
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
	validate: Function,
	value: String,
	property: String
});
</script>

<template>
	<div Entry>
		<div EntryVal>
			<div title><slot></slot></div>
			<input
				ref="input"
				:autocomplete="property"
				:value="value"
				:placeholder="warn || property"
				@keydown.enter="update()"
				@blur="update()"
			/>
		</div>
	</div>
</template>

<script>
export default {
	emits: ['update'],
	data() {
		return {
			focus: false,
			editing: false,
			warn: ''
		};
	},
	watch: {
		focus(focused) {
			if (focused) this.editing = true;
		}
	},
	methods:{
		update(){
			this.$refs.input.blur();
			if (this.validate(this.$refs.input.value))
				this.$emit('update', this.$refs.input.value);
			else {
				this.warn = 'ssss';
				this.$refs.input.value = '';
			}
		}
	}
};
</script>
