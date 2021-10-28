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
						property="School"
						@update="(val) => this.$emit('update', 'School', val)"
					>
						<span en-US>School</span>
						<span zh-CN>所属学校或机构</span>
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
								likes.indexOf('architectureDesign') > -1
									? 'selected'
									: 'unselected'
							"
							@click="
								likes.indexOf('architectureDesign') > -1
									? (likes = likes.filter(
										  (item) =>
											  item !== 'architectureDesign'
									  ))
									: likes.push('architectureDesign')
							"
						>
							<template #content>
								<span>体系结构设计</span>
							</template>
						</CheckboxCard>
						<CheckboxCard
							:class="
								likes.indexOf('rtl') > -1
									? 'selected'
									: 'unselected'
							"
							@click="
								likes.indexOf('rtl') > -1
									? (likes = likes.filter(
										  (item) => item !== 'rtl'
									  ))
									: likes.push('rtl')
							"
						>
							<template #content>
								<span>RTL开发和验证</span>
							</template>
						</CheckboxCard>
						<CheckboxCard
							:class="
								likes.indexOf('soc') > -1
									? 'selected'
									: 'unselected'
							"
							@click="
								likes.indexOf('soc') > -1
									? (likes = likes.filter(
										  (item) => item !== 'soc'
									  ))
									: likes.push('soc')
							"
						>
							<template #content>
								<span>SoC集成和验证</span>
							</template>
						</CheckboxCard>
						<CheckboxCard
							:class="
								likes.indexOf('ic') > -1
									? 'selected'
									: 'unselected'
							"
							@click="
								likes.indexOf('ic') > -1
									? (likes = likes.filter(
										  (item) => item !== 'ic'
									  ))
									: likes.push('ic')
							"
						>
							<template #content>
								<span>IC后端设计</span>
							</template>
						</CheckboxCard>
					</div>
					<DirectInputEntry
						v-if="identity === 'teacher'"
						:validate="(val) => !!val"
						property="College"
						@update="(val) => this.$emit('update', 'College', val)"
					>
						<span en-US>College</span>
						<span zh-CN>所属学院</span>
					</DirectInputEntry>
					<DirectInputEntry
						v-if="identity === 'teacher'"
						:validate="(val) => !!val"
						property="Title"
						@update="(val) => this.$emit('update', 'Title', val)"
					>
						<span en-US>Title</span>
						<span zh-CN>职称</span>
					</DirectInputEntry>
					<DirectInputEntry
						v-if="identity === 'ta' || identity === 'student'"
						:validate="(val) => !!val"
						property="Major"
						@update="(val) => this.$emit('update', 'Major', val)"
					>
						<span en-US>Major</span>
						<span zh-CN>专业</span>
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
							<div>
								<i class="fa fa-upload"></i>
								<span>选择文件(最大限10M)</span>
							</div>
						</div>
					</div>
					<DirectInputEntry
						:validate="(val) => !!val"
						property="Remark"
						@update="(val) => this.$emit('update', 'Remark', val)"
					>
						<span en-US>Remark(Optional)</span>
						<span zh-CN>备注(选填)</span>
					</DirectInputEntry>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { locale } from "/util/locale.js";
import Button from "../Button.vue";
export default {
	components: { Button },
	emits: ["update"],
	data() {
		return {
			locale,
			likes: [],
		};
	},
	watch: {
		likes: {
			deep: true,
			handler(val) {
				this.$emit("update", "likes", val);
			},
		},
	},
	methods: {
		uploadFile() {
			let fileInput = this.$refs.fileInput;
			fileInput.click();
			fileInput.onchange = () => {
				let file = fileInput.files[0];
				
				this.$emit("update", "Resume", file);
			};
		},
	},
};
</script>

<style scoped>
::v-deep(.selected) {
	border-color: var(--accent);
}

::v-deep(.unselected) {
	border-color: var(--gray-brighter);
	opacity: 0.5;
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
</style>
