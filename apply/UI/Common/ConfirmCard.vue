

<template>
	<div Entry>
		<div EntryVal>
			<div>{{ attr }}</div>
			<div>
				{{
					Array.isArray(val)
						? val.map((item) => likesMap[item]).join(",")
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
			likesMap: {
				architectureDesign: "体系结构设计",
				rtl: "RTL开发和验证",
				soc: "SoC集成和验证",
				ic: "IC后端设计",
			},
		};
	},
};
</script>
