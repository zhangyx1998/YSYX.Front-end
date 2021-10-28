<script setup>
import Dialog from "/components/AppView/Panes/Dialog.vue";
import Button from "/components/Button.vue";
import Paragraph from "/components/Paragraph.vue";
import RefreshButton from "/components/Button/RefreshButton.vue";
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
						<span
							class="small"
							style="
								flex-grow: 1;
								justify-content: flex-end;
								--button-padding: 0em 0.2em;
								--button-margin: 0 0.5em;
							"
						>
							<Button
								v-if="el.userID == userID"
								type="link"
								:name="
									intl({
										'en-US': 'edit',
										'zh-CN': '编辑',
									})
								"
								@click="
									this.$emit(
										'show-pane',
										'PostManage',
										Object.assign({}, el)
									)
								"
							/>
							<Button
								v-if="el.userID == userID || userPriv.admin"
								type="link"
								:name="
									intl({
										'en-US': 'delete',
										'zh-CN': '删除',
									})
								"
								@click="deletePost(el.ID)"
							/>
						</span>
					</div>
					<div content>
						{{ el.content }}
					</div>
					<div
						style="
							display: block;
							text-align: left;
							font-size: 0.8em;
							color: var(--gray-bright);
						"
						:set="
							(dateStr = localeDate(
								el.updateTime || el.createTime
							))
						"
					>
						<span zh-CN v-if="!el.updateTime">
							{{ el.userName }} 发布于 {{ dateStr }}
						</span>
						<span zh-CN v-else>
							来自 {{ el.userName }}, 最后更新于 {{ dateStr }}
						</span>
						<span en-US v-if="!el.updateTime">
							Posted by {{ el.userName }} at {{ dateStr }}
						</span>
						<span en-US v-else>
							Posted by {{ el.userName }}, updated at
							{{ dateStr }}
						</span>
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
import { Session, hasModuleAccess } from "/space/Session.js";
import { monthShort, localeDate } from "/util/date.js";
import { digVal } from "/util/object.js";
import { env, intl } from "/util/env.js";

export default {
	data() {
		return {
			env,
			content: [],
			adminContent: [],
			userID: Session.data.ID,
			userPriv: Session.data.Privilege,
			managePriv: false
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
			let publicPosts;
			Session.post("PublicData/Posts").then((content) => {
				publicPosts = content;
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
			// If user has PostManage authority, fetch all posts
			if (hasModuleAccess('PostManage')) {
				Session.post("PostManage/JSON").then((content) => {
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
			}
		},
		deletePost(postID) {
			if (
				confirm(
					this.intl({
						"en-US": `Delete this post? (ID ${postID})\nPosts can not be recovered once deleted.`,
					})
				)
			) {
				let update = {};
				update[postID] = null;
				Session.post("PostManage/Update", update).then(
					({ valid, message }) => {
						console.log(valid, message);
						this.fetch();
					}
				);
			}
		},
	},
	activated() {
		this.fetch();
		this.managePriv = 'PostManage' in Session.data.Modules
	},
};
</script>

<style scoped>
[float] {
	display: flex;
	justify-content: right;
}
</style>