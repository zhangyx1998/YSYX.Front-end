<script setup>
defineProps({
	panes: Object,
	defaultPane: String,
});
</script>

<template>
	<div class="PaneSelector">
		<span v-for="(val, ID) in panes" :key="ID">
			<div
				:class="['Option', display == ID ? 'active' : '']"
				@click="
					display = ID;
					$emit('select', ID);
				"
			>
				<span zh-CN>{{ val.name["zh-CN"] }}</span>
				<span en-US>{{ val.name["en-US"] }}</span>
			</div>
		</span>
	</div>
</template>

<script>
export default {
	emits: ['select'],
	data() {
		return {
			display: (() => {
				if (typeof this.defaultPane === "string" && this.defaultPane in this.panes) {
					return this.defaultPane;
				} else {
					for (const ID in this.panes) {
						return ID;
					}
				}
			})(),
		};
	},
	mounted() {
		console.log(this);
		this.$emit('select', this.display);
	}
};

export function $select(app, name) {
	if ('display' in app) {
		app.display = name;
	} else {
		console.error('Expecting property "display" in panselector implementation');
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
	border-bottom: 0.08em inset var(--gray-brighter);
}
/* Option buttons */
.Option {
	cursor: pointer;
	color: var(--gray);
	padding: 0.5em 0.6em;
	margin: 0 0.3em -0.08em 0.3em;
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