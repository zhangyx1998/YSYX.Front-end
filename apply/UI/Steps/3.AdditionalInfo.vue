<script setup>
import DirectInputEntry from "../Common/DirectInputEntry.vue";
import RadioCard from "../Common/RadioCard.vue";
import CheckboxCard from "../Common/CheckboxCard.vue";
defineProps({
	identity: String,
});
</script>

<template>
	<div Content>
		<div EntryGroup>
			<div Form ref="IdCard">
				<div EntryGroup>
					<DirectInputEntry
						:validate="(val) => !!val"
						property="institution"
						@update="
							(val) => this.$emit('update', 'institution', val)
						"
					>
						<span>{{
							intl({
								"en-US": "Institution",
								"zh-CN": "所属学校或机构",
							})
						}}</span>
					</DirectInputEntry>
					<div
						Entry
						style="display: block"
						v-if="identity === 'student'"
					>
						<span style="font-size: 0.8em; opacity: 0.6"
							>你对一生一芯计划的哪些部分比较感兴趣</span
						>
						<CheckboxCard
							:class="
								direction.indexOf('architectureDesign') > -1
									? 'selected'
									: 'unselected'
							"
							@click="
								direction.indexOf('architectureDesign') > -1
									? (direction = direction.filter(
										  (item) =>
											  item !== 'architectureDesign'
									  ))
									: direction.push('architectureDesign')
							"
							:isSelected="
								direction.indexOf('architectureDesign') > -1
							"
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
								direction.indexOf('ic') > -1
									? 'selected'
									: 'unselected'
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
					<div
						Entry
						style="display: block"
						v-if="identity === 'student' || identity === 'ta'"
					>
						<span style="font-size: 0.8em; opacity: 0.6"
							>简历(选填)</span
						>
						<div class="upload" @click="uploadFile">
							<input
								type="file"
								ref="fileInput"
								style="display: none"
							/>
							<div v-if="!resumeName">
								<i class="fa fa-upload"></i>
								<span>选择文件(最大限10M)</span>
							</div>
							<div v-else>
								<span>{{ resumeName }}</span>
							</div>
						</div>
					</div>
					<DirectInputEntry
						:validate="(val) => !!val"
						property="Remark"
						@update="(val) => this.$emit('update', 'remark', val)"
					>
						<span>{{
							intl({
								"en-US": "Remark(Optional)",
								"zh-CN": "备注(选填)",
							})
						}}</span>
					</DirectInputEntry>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { intl } from "/util/env.js";
import Button from "/components/Button.vue";
export default {
	components: { Button },
	emits: ["update"],
	data() {
		return {
			direction: [],
			resumeName: "",
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
		uploadFile() {
			let fileInput = this.$refs.fileInput;
			fileInput.click();
			fileInput.onchange = () => {
				let file = fileInput.files[0];
				this.resumeName = file.name;
				this.$emit("update", "resume", file);
			};
		},
		intl,
	},
};
</script>

<style scoped>
::v-deep(.selected) {
	border-color: var(--accent);
}

::v-deep(.unselected) {
	border-color: var(--gray-brighter);
}
.upload {
	width: 100%;
	height: 2em;
	border: 1px solid var(--gray);
	border-radius: 5px;
	color: var(--gray);
	display: flex;
	justify-content: space-around;
	align-items: center;
}
::v-deep(.selected) {

}
::v-deep(.unselected) {
	opacity: .7;
}
</style>
