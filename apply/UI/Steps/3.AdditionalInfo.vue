<script setup>
import DirectInputEntry from "../Common/DirectInputEntry.vue";
import RadioCard from "../Common/RadioCard.vue";
import CheckboxCard from "../Common/CheckboxCard.vue";
import Resume from "../Common/Resume.vue";
defineProps({
	identity: String,
});
</script>

<template>
	<div Content @scroll="(e) => this.$emit('scroll', e)">
		<div EntryGroup>
			<DirectInputEntry
				:validate="(val) => !!val"
				property="institution"
				@update="(val) => this.$emit('update', 'institution', val)"
			>
				<span>{{
					intl({
						"en-US": "Institution",
						"zh-CN": "所属学校或机构",
					})
				}}</span>
			</DirectInputEntry>
			<DirectInputEntry
				v-if="identity === 'ta' || identity === 'student'"
				:validate="(val) => !!val"
				property="Major"
				@update="(val) => this.$emit('update', 'major', val)"
			>
				<span>{{
					intl({
						"en-US": "Major",
						"zh-CN": "专业",
					})
				}}</span>
			</DirectInputEntry>
			<div Entry style="display: block" v-if="identity === 'student'">
				<div title>你对一生一芯计划的哪些部分比较感兴趣</div>
				<CheckboxCard
					:class="
						direction.indexOf('architectureDesign') > -1
							? 'selected'
							: 'unselected'
					"
					@click="
						direction.indexOf('architectureDesign') > -1
							? (direction = direction.filter(
									(item) => item !== 'architectureDesign'
							  ))
							: direction.push('architectureDesign')
					"
					:isSelected="direction.indexOf('architectureDesign') > -1"
				>
					<span>体系结构设计</span>
				</CheckboxCard>
				<CheckboxCard
					:class="
						direction.indexOf('rtl') > -1
							? 'selected'
							: 'unselected'
					"
					@click="
						direction.indexOf('rtl') > -1
							? (direction = direction.filter(
									(item) => item !== 'rtl'
							  ))
							: direction.push('rtl')
					"
					:isSelected="direction.indexOf('rtl') > -1"
				>
					<span>RTL开发和验证</span>
				</CheckboxCard>
				<CheckboxCard
					:class="
						direction.indexOf('soc') > -1
							? 'selected'
							: 'unselected'
					"
					@click="
						direction.indexOf('soc') > -1
							? (direction = direction.filter(
									(item) => item !== 'soc'
							  ))
							: direction.push('soc')
					"
					:isSelected="direction.indexOf('soc') > -1"
				>
					<span>SoC集成和验证</span>
				</CheckboxCard>
				<CheckboxCard
					:class="
						direction.indexOf('ic') > -1 ? 'selected' : 'unselected'
					"
					@click="
						direction.indexOf('ic') > -1
							? (direction = direction.filter(
									(item) => item !== 'ic'
							  ))
							: direction.push('ic')
					"
					:isSelected="direction.indexOf('ic') > -1"
				>
					<span>IC后端设计</span>
				</CheckboxCard>
			</div>
			<DirectInputEntry
				v-if="identity === 'teacher'"
				:validate="(val) => !!val"
				property="faculty"
				@update="(val) => this.$emit('update', 'faculty', val)"
			>
				<span>{{
					intl({
						"en-US": "Faculty",
						"zh-CN": "所属学院",
					})
				}}</span>
			</DirectInputEntry>
			<DirectInputEntry
				v-if="identity === 'teacher'"
				:validate="(val) => !!val"
				property="Title"
				@update="(val) => this.$emit('update', 'title', val)"
			>
				<span>{{
					intl({
						"en-US": "Title",
						"zh-CN": "职称",
					})
				}}</span>
			</DirectInputEntry>

			<DirectInputEntry
				:validate="(val) => true"
				property="Remark"
				@update="(val) => this.$emit('update', 'remark', val)"
			>
				<span>{{
					intl({
						"en-US": "Remark (Optional)",
						"zh-CN": "备注 (可选)",
					})
				}}</span>
			</DirectInputEntry>
			<Resume v-if="identity === 'student' || identity === 'ta'">
				<span>{{
					intl({
						"en-US": "Resume (Optional)",
						"zh-CN": "简历 (可选)",
					})
				}}</span>
			</Resume>
		</div>
	</div>
</template>
<script>
import { intl } from "/util/env.js";
import Button from "/components/Button.vue";
export default {
	components: { Button },
	emits: ["update", "scroll"],
	data() {
		return {
			direction: [],
		};
	},
	watch: {
		direction: {
			deep: true,
			handler(val) {
				this.$emit("update", "direction", val);
			},
		},
	},
	methods: {
		intl,
	},
};
</script>

<style scoped>
</style>
