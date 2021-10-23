<script setup>
import Button from "/space/UI/Common/Button.vue";
import DirectInputEntry from "../Common/DirectInputEntry.vue";
</script>

<template>
	<div Content>
		<div EntryGroup>
			<div Form ref="IdCard">
				<div EntryGroup>
					<DirectInputEntry
						:validate="(val) => val.trim().length >= 2"
						property="name"
						@update="(val) => (this.$emit('update', 'Name', val))"
					>
						<span en-US>Name</span>
						<span zh-CN>姓名</span>
					</DirectInputEntry>
					<DirectInputEntry
						:validate="
							(val) =>
								/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
									val
								)
						"
						property="email"
						@update="(val) => (this.$emit('update', 'Mail', val))"
					>
						<span en-US>Mail</span>
						<span zh-CN>邮箱</span>
					</DirectInputEntry>
					<DirectInputEntry
						:validate="(val) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)"
						property="tel"
						@update="(val) => (this.$emit('update', 'Cell', val))"
					>
						<span en-US>phone</span>
						<span zh-CN>电话</span>
					</DirectInputEntry>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { locale } from "/util/locale.js";
export default {
	emits: ["update"],
	data() {
		return {
			locale,
			name: "",
			mail: "",
			cell: "",
		};
	},
	watch: {
		name(val) {
			console.log(val);
		},
		cell(val) {
			console.log(val);
		},
		mail(val) {
			console.log(val);
		},
		complete(val) {
			if (val === true) {
				this.$emit("submitToApp", {
					name: this.name,
					mail: this.mail,
					cell: this.cell,
				});
				this.$emit("changeStepIsOk", true);
			} else {
				this.$emit("changeStepIsOk", false);
			}
		},
	},
	computed: {
		complete() {
			let mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			let cellReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
			return !!(
				this.name.trim().length >= 2 &&
				mailReg.test(this.mail) &&
				cellReg.test(this.cell)
			);
		},
	},
};
</script>

<style scoped>

</style>
