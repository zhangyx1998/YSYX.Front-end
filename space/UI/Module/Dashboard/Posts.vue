<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import Button from "/space/UI/Common/Button.vue";
import Paragraph from "/space/UI/Common/Paragraph.vue";
import RefreshButton from "/space/UI/Common/RefreshButton.vue";
</script>

<template>
	<div ContentView>
		<div
			Content
			_1024_
			v-if="content && content.length"
			style="padding-bottom: 2em"
		>
			<span w100 v-for="el in content" :key="el.ID">
				<div
					:class="
						{
							desktop:
								'card list-entry shadow-light shadow-dynamic',
							mobile: 'card list-seamless',
						}[env.platform]
					"
				>
					<div title>
						<div class="large">{{ el.title }}&nbsp;</div>
						<div style="flex-grow: 1"></div>
						<div class="suffix">
							<span zh-CN>由</span>
							<span en-US>Posted by</span>
							<span style="padding: 0 0.5em">{{
								el.userName
							}}</span>
							<span zh-CN>发布</span>
						</div>
					</div>
					<div content>
						<Paragraph :text="el.content" />
					</div>
					<div
						style="
							text-align: center;
							font-size: 0.8em;
							color: var(--gray-bright);
						"
					>
						<span v-if="el.updateTime">
							<span zh-CN>最后更新于</span>
							<span en-US>Modified at</span>
						</span>
						<span v-else>
							<span zh-CN>创建于</span>
							<span en-US>Posted at</span> </span
						>&nbsp;<span>{{
							localeDate(el.createTime || el.updateTime)
						}}</span>
					</div>
				</div>
			</span>
			<RefreshButton @refresh="fetch" />
		</div>
		<Dialog
			v-else
			class="gray"
			style="opacity: 0.8"
			:title="
				intl({
					'en-US': 'No posts released',
					'zh-CN': '暂未发布任何公告',
				})
			"
			:suffix="
				intl({
					'en-US':
						'If you think something went wrong, please feed back in account panel',
					'zh-CN': '如果您认为这是一个错误，请在设置中进行反馈',
				})
			"
			:buttons="[
				{
					name: intl({ 'en-US': 'Refresh', 'zh-CN': '刷新' }),
					type: 'outlined gray',
					callback: fetch,
				},
			]"
		/>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { monthShort, localeDate } from "/util/date.js";
import { digVal } from "/util/object.js";
import { env, intl } from "/util/env.js";

export default {
	data() {
		return {
			env,
			lang: Session.language,
			content: [],
		};
	},
	computed: {
		_name_() {
			return "ProgressReport/JSON";
		},
	},
	methods: {
		intl,
		localeDate,
		fetch() {
			Session.post("PublicData/Posts").then((content) => {
				this.content = Object.keys(content)
					.sort((a, b) => {
						const [A, B] = [a, b].map(
							(el) => el.updateTime || el.createTime
						);
						return B - A;
					})
					.map((ID) => ({
						ID,
						...content[ID],
					}));
			});
		},
		titleFormat(ID) {
			const [Y, M, D] = ID.split("-");
			return {
				Date: `${monthShort(M)} ${D}`,
				Year: Y,
			};
		},
	},
	activated() {
		console.log(this);
		this.fetch();
	},
};
</script>

<style scoped>
[float] {
	display: flex;
	justify-content: right;
}
</style>