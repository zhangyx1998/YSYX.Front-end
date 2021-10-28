<script setup>
import Button from "/components/Button.vue";
import Responsive from "/components/Responsive.vue";
defineProps({
	validate: Function,
	value: String,
});
</script>

<template>
	<div Entry>
		<div
			EntryVal
			:style="{ 'pointer-events': focus ? 'all' : 'none' }"
			@click="
				if (focus) {
					this.$refs.input.focus();
				}
			"
			@keydown.enter="update"
			@keydown.esc="discard"
		>
			<div title><slot></slot></div>
			<input
				ref="input"
				:value="value"
				style="width: 100%; font-size: 1rem;"
				@focus="focus = true"
				@blur="focus = false"
				@keydown.enter="update()"
			/>
		</div>
		<div EntryAction>
			<Responsive
				lighter
				v-if="!focus"
				style="font-size: 0.8em; text-decoration: underline; opacity: 0.5;"
				@click="this.$refs.input.focus()"
			>
				<span en-US>edit</span>
				<span zh-CN>编辑</span>
			</Responsive>
			<Responsive lighter v-if="focus">
				<i class="fas fa-times"></i>
			</Responsive>
			<Responsive lighter v-if="focus">
				<i class="fas fa-check"></i>
			</Responsive>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			focus: false,
			editing: false,
		};
	},
	watch: {
		focus(focused) {
			if (focused) this.editing = true;
		},
	},
};
</script>

<style scoped>
@import "./index.css";
</style>