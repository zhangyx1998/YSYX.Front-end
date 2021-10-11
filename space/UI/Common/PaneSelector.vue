<script setup>
defineProps({
	el: Object
});
</script>

<template>
	<div class="PaneSelector">
		<span v-for="(val, ID) in panes" :key="ID">
			<div :class="['Option', el.display == ID ? 'active' : '']" @click="el.display = ID">
				<span zh-CN>{{ val.name['zh-CN'] }}</span>
				<span en-US>{{ val.name['en-US'] }}</span>
			</div>
		</span>
	</div>
</template>

<script>
export default {
	data() {
		return this.el.$data;
	}
}
</script>


<style scoped>
.PaneSelector {
	/* Positioning */
	position: relative;
	width: 100%;
	/* Layout */
	display: flex;
	align-items: center;
	justify-content: center;
	/* Apperance */
	background: var(--gray-light);
}
/* Option buttons */
.Option {
	cursor: pointer;
	color: var(--gray);
	padding: 0.5em 0.6em;
	margin: 0 0.3em;
	border-bottom: 0.15em solid transparent;
}
.Option:hover {
	background: rgba(0, 0, 0, 0.04);
	border-bottom: 0.15em solid var(--gray-bright);
}
.Option:active {
	background: rgba(0, 0, 0, 0.06);
	border-bottom: 0.15em solid var(--gray-bright);
}
.Option.active {
	cursor: default;
	color: var(--accent);
	border-bottom: 0.15em solid var(--accent);
}
</style>