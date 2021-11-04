<script setup>
import DirectTextareaEntry from "../Common/DirectTextareaEntry.vue"
import DirectInputEntry from "../Common/DirectInputEntry.vue";
import RadioCard from "../Common/RadioCard.vue";
import Checkbox from "../../../components/Checkbox.vue";
import Resume from "../Common/Resume.vue";
import SearchEntry from "../Common/SearchEntry.vue";
defineProps({
	identity: String,
});
</script>

<template>
	<div Content @scroll="(e) => this.$emit('scroll', e)">
		<div EntryGroup>
			<SearchEntry
				property="institution"
				:search="searchAPI"
				:validate="(val) => !!val.trim()"
				@update="(val) => this.$emit('update', 'institution', val)"
				@update-alt="
					(val) => this.$emit('update', 'institutionAltName', val)
				"
				/>
			<DirectInputEntry
				v-if="identity === 'ta' || identity === 'student'"
				:validate="(val) => !!val"
				property="major"
				@update="(val) => this.$emit('update', 'major', val)"
				/>
			<div Entry style="display: block" v-if="identity === 'student'">
				<div title>
					{{
						intl({
							"en-US": "What parts of the life one core plan are you interested in",
							"zh-CN": "你对一生一芯计划的哪些部分比较感兴趣",
						})
					}}
				</div>
				<Checkbox
					@click="
						direction.indexOf('architectureDesign') > -1
							? (direction = direction.filter(
									(item) => item !== 'architectureDesign'
							  ))
							: direction.push('architectureDesign')
					"
					:selected="direction.indexOf('architectureDesign') > -1"
					>{{
						intl({
							"en-US": "System architecture design",
							"zh-CN": "体系结构设计",
						})
					}}</Checkbox
				>
				<Checkbox
					@click="
						direction.indexOf('rtl') > -1
							? (direction = direction.filter(
									(item) => item !== 'rtl'
							  ))
							: direction.push('rtl')
					"
					:selected="direction.indexOf('rtl') > -1"
				>{{
						intl({
							"en-US": "RTL Development & Verification",
							"zh-CN": "RTL 开发验证",
						})
					}}</Checkbox>
				<Checkbox
					@click="
						direction.indexOf('soc') > -1
							? (direction = direction.filter(
									(item) => item !== 'soc'
							  ))
							: direction.push('soc')
					"
					:selected="direction.indexOf('soc') > -1"
				>{{
						intl({
							"en-US": "SOC Integration & Verification",
							"zh-CN": "SOC 集成和验证",
						})
					}}</Checkbox>
				<Checkbox
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
					:selected="direction.indexOf('ic') > -1"
				>{{
						intl({
							"en-US": "IC Backend design",
							"zh-CN": "IC 后端设计",
						})
					}}</Checkbox>
			</div>
			<DirectInputEntry
				v-if="identity === 'teacher'"
				:validate="(val) => !!val"
				property="faculty"
				@update="(val) => this.$emit('update', 'faculty', val)"
			/>
				
			<DirectInputEntry
				v-if="identity === 'teacher'"
				:validate="(val) => !!val"
				property="Title"
				@update="(val) => this.$emit('update', 'title', val)"
			/>
			<Resume @update="(val) => this.$emit('update', 'resume', val)"
			v-if="identity === 'student' || identity === 'ta'" />
			<DirectTextareaEntry
				:validate="(val) => true"
				property="remark"
				@update="(val) => this.$emit('update', 'remark', val)"
			/>
		</div>
	</div>
</template>
<script>
import { intl } from "/util/env.js";
import searchAPI from "/util/api/Institutions.js";
export default {
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
