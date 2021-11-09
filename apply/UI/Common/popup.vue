<script setup>
defineProps({
	submitData: Object,
});
</script>


<template>
	<div v-show="popShow" class="popup">
		<div class="success">
			<div v-if="submitData.valid">
				<svg width="120" height="120" viewBox="0 0 40 40">
					<circle cx="50%" cy="50%" r="19" class="validCircle"></circle>
					<polyline
						points="5,20 15,30 35 10"
						class="hookmark"
					></polyline>
				</svg>
			</div>
			<div v-if="!submitData.valid">
				<svg width="120" height="120" viewBox="0 0 40 40">
					<circle cx="50%" cy="50%" r="19" class="invalidCircle"></circle>
					<line x1="10" y1="10" x2="30" y2="30" class="hookmark"></line>
					<line x1="30" y1="10" x2="10" y2="30" class="hookmark"></line>
				</svg>
			</div>
			<div v-if="submitData.valid" class="submit_success">提交成功</div>
			<div v-if="!submitData.valid" class="submit_success">提交失败</div>
			<div class="ID_number">ID:{{ submitData.id }}</div>
			<div class="link">
				<a href="#" alt="home" style="padding-right: 6em">返回首页</a>
				<a href="#" alt="detail" style="padding-left: 6em">查看详情</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			popShow: false,
		};
	},
};
</script>
<style scoped>
.popup {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	justify-content: center;
	background-color: var(--white);
	z-index: 9999;
}
.success {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.submit_success {
	font-size: 1.2em;
	padding-top: 1em;
}
.ID_number {
	font-size: 1.5em;
	padding: 1.5em 0em;
	color: var(--green);
}
.link a {
	text-decoration: none;
	color: var(--accent);
}
.hookmark {
	stroke-dasharray: 100 100;
	stroke-dashoffset: 100;
	animation: 0.5s linear hookmarkTransform forwards 0.2s;
	fill: none;
	stroke: var(--white);
	stroke-width: 1px;
}
.validCircle {
	stroke: var(--green-bright);
	stroke-width: 2px;
	fill: var(--green-bright);
	stroke-dasharray: 320;
}
.invalidCircle {
	stroke: var(--red-bright);
	stroke-width: 2px;
	fill: var(--red-bright);
	stroke-dasharray: 320;
}
@keyframes hookmarkTransform {
	from {
		stroke-dasharray: 100 100;
		stroke-dashoffset: 100;
	}
	to {
		stroke-dasharray: 100 100;
		stroke-dashoffset: 0;
	}
}
</style>