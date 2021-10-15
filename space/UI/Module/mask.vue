<template>
	<div UI-Top DesktopView>
		<span>
			<h2>
				<span en-US>No APP Selected</span>
				<span zh-CN>未选择应用</span>
			</h2>
			<p>
				<span en-US>Select an app on the side bar to get started</span>
				<span zh-CN>请从左侧选择应用</span>
			</p>
		</span>
	</div>
</template>

<style scoped>
span {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* Appearance */
	color: black;
	opacity: 0.4;
	font-size: 1.4em;
}

span * {
	line-height: 100%;
	margin: 0.1em;
}
</style>