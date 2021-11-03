<script setup>
import RadioCard from "../Common/RadioCard.vue";
</script>

<template>
	<div Content @scroll="(e) => this.$emit('scroll', e)">
		<div EntryGroup>
			<RadioCard
				:class="identity === 'student' ? 'selected' : 'unselected'"
				@click="identity = 'student'"
			>
				<template #title>
					{{ intl({ "en-US": "student", "zh-CN": "学生" }) }}
				</template>
				<template #content>
					{{
						intl({
							"en-US": "Participate in the learning of each stage of the core project, get the help of the core teaching assistant team, and get the flow opportunity through the review of the project team",
							"zh-CN": "参与⼀⽣⼀芯项⽬各阶段的学习，获取⼀⽣⼀芯助教团队的帮助，通过项⽬组的审核即可获得流⽚机会",
						})
					}}
				</template>
			</RadioCard>
			<RadioCard
				:class="identity === 'ta' ? 'selected' : 'unselected'"
				@click="identity = 'ta'"
			>
				<template #title>
					{{
						intl({
							"en-US": "teaching assistant",
							"zh-CN": "助教",
						})
					}}
				</template>
				<template #content>
					{{
						intl({
							"en-US": "Answer the learning questions, review and guide the learning code, and participate in the teaching plan design and courseware making of each module of the learning core",
							"zh-CN": "解答学⽣的问题，对学⽣的代码进⾏审阅和指导，并参与⼀⽣⼀芯各个模块的教案设计和课件制作",
						})
					}}
				</template>
			</RadioCard>
			<RadioCard
				:class="identity === 'teacher' ? 'selected' : 'unselected'"
				@click="identity = 'teacher'"
			>
				<template #title>
					{{
						intl({
							"en-US": "teacher",
							"zh-CN": "老师",
						})
					}}
				</template>
				<template #content>
					{{
						intl({
							"en-US": "Get the latest information of item (and communicate and cooperate with our team",
							"zh-CN": "获取项⽬的最新资料，与我们的团队进⾏沟通和协作",
						})
					}}			
				</template>
			</RadioCard>
		</div>
	</div>
</template>
<script>
import { intl } from "/util/env.js";
export default {
	emits: ["update", "scroll"],
	data() {
		return {
			locale,
			identity: "",
		};
	},
	watch: {
		identity(val) {
			this.$emit("update", "identity", val);
		},
	},
	methods: {
		intl,
	},
};
</script>

<style scoped>
[inspector-list] {
	display: flex;
	flex-direction: column;
	border-radius: 0.3em;
	margin-top: 0.2em;
	margin-bottom: 1em;
	background-color: var(--gray-background);
	color: var(--gray-bright);
	font-size: 0.9em;
}

::v-deep(.selected) {
	border-color: var(--accent-dark);
}

::v-deep(.unselected) {
	border-color: var(--gray-brighter);
	opacity: 0.7;
}
</style>
