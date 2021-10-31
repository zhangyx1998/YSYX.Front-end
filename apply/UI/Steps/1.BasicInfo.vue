<script setup>
import Button from "/components/Button.vue";
import DirectInputEntry from "../Common/DirectInputEntry.vue";
</script>

<template>
	<div Content>
		
			<div Form ref="IdCard">
				<div EntryGroup>
					<DirectInputEntry
						:validate="(val) => val.trim().length >= 2"
						property="name"
						@update="(val) => this.$emit('update', 'name', val)"
					>
						<span>{{
							intl({ "en-US": "Name", "zh-CN": "姓名" })
						}}</span>
					</DirectInputEntry>
					<DirectInputEntry
						:validate="
							(val) =>
								/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
									val
								)
						"
						property="email"
						@update="(val) => this.$emit('update', 'mail', val)"
					>
						<span>{{
							intl({ "en-US": "Mail", "zh-CN": "邮箱" })
						}}</span>
					</DirectInputEntry>
					<DirectInputEntry
						:validate="(val) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)"
						property="tel"
						@update="(val) => this.$emit('update', 'cell', val)"
					>
						<span>{{
							intl({ "en-US": "Cell", "zh-CN": "电话" })
						}}</span>
					</DirectInputEntry>
				</div>
			</div>
		
	</div>
</template>
<script>
import { intl } from "/util/env.js";
export default {
	emits: ["update"],
	data() {
		return {};
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
	},
	methods: {
		intl,
	},
};
</script>

<style scoped>
</style>
