

<template>
	<div Entry v-if="Array.isArray(val) ? !!val.length : !!val">
		<div EntryVal>
			<div title>{{ attr }}</div>
			<div style="font-size:1em;color:var(--gray-dark)">
				{{
					Array.isArray(val)
						? val.map((item) => directionMap[item]).join(",")
						: val
				}}
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>

<script>
export default {
	props: ["attr", "val"],
	data() {
		return {
			directionMap: {
				architectureDesign: "体系结构设计",
				rtl: "RTL开发和验证",
				soc: "SoC集成和验证",
				ic: "IC后端设计",
			},
		};
	},
};
</script>
