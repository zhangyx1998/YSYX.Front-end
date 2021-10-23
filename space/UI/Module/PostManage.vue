<script setup>
import Dialog from "/space/UI/Common/Panes/Dialog.vue";
import Button from "/space/UI/Common/Button.vue";
import BackButton from "/space/UI/Common/BackButton.vue";
import MobileTitleBar from "../Mobile/TitleBar.vue";
defineProps({
	args: Object,
});
</script>

<template>
	<MobileTitleBar :title="AppTitle">
		<template #left><BackButton @back="$emit('back')" /></template>
		<template #right v-if="ID"
			><Button
				icon="far fa-trash-alt"
				type="seamless white"
				@click="deletePost"
		/></template>
	</MobileTitleBar>
	<div UI-Top ContentView>
		<div Content _1024_>
			<h3 w100>
				<span en-US>Post title</span>
				<span zh-CN>公告标题</span>
			</h3>
			<textarea
				v-model="post.title"
				:placeholder="
					intl({
						'en-US': 'Post title goes here ...',
						'zh-CN': '在这里输入公告标题',
					})
				"
			/>
			<h3 w100>
				<span en-US>Post content</span>
				<span zh-CN>公告正文</span>
			</h3>
			<textarea
				v-model="post.content"
				:placeholder="
					intl({
						'en-US': 'Post content goes here ...',
						'zh-CN': '在这里输入公告正文',
					})
				"
				style="min-height: 24em"
			/>
			<div
				w100
				h-rule
				style="
					display: flex;
					justify-content: space-evenly;
					--button-margin: 1.2em 0.8em 0 0.8em;
				"
			>
				<Button
					type="outlined gray"
					:name="intl({ 'en-US': 'Clear', 'zh-CN': '清空输入框' })"
					@click="clear"
				/>
				<Button
					:type="['solid', ID ? 'blue' : 'green'].join(' ')"
					:name="
						intl(
							ID
								? { 'en-US': 'Update', 'zh-CN': '更新' }
								: { 'en-US': 'Post', 'zh-CN': '发布公告' }
						)
					"
					@click="submit"
					style="flex-grow: 1; max-width: 8em"
				/>
			</div>
		</div>
	</div>
</template>
 
<script>
import { intl } from "/util/env.js";
export default {
	emits: ["show-pane", "back"],
	data() {
		return {
			ID: "",
			AppTitle: "",
			post: {
				title: "",
				content: "",
			},
		};
	},
	methods: {
		intl,
		deletePost() {
			if (
				confirm(
					this.intl({
						"en-US": `Delete this post? (ID ${this.ID})\nPosts can not be recovered once deleted.`,
					})
				)
			) {
				let update = {};
				update[this.ID] = null;
				Session.post("PostManage/Update", update).then(
					({ valid, message }) => {
						console.log(valid, message);
						this.$emit("back");
					}
				);
			}
		},
		clear() {
			if (
				this.ID ||
				confirm(
					this.intl({
						"en-US": `Clear all content you typed in this post?\nThis action is not recoverable.`,
					})
				)
			) {
				this.post.title = "";
				this.post.content = "";
			}
		},
		submit() {
			let command,
				payload = {};
			if (this.ID) {
				command = "Update";
				payload[this.ID] = Object.assign({}, this.post);
			} else {
				command = "Post";
				payload = Object.assign({}, this.post);
			}
			Session.post(`PostManage/${command}`, payload).then(
				({ valid, message }) => {
					console.log(valid, message);
					this.$emit('back');
				}
			);
		},
	},
	computed: {
		AppTitle() {
			return this.intl(
				this.args && this.args.ID
					? { "en-US": "Edit Post", "zh-CN": "编辑公告" }
					: { "en-US": "Create Post", "zh-CN": "发布公告" }
			);
		},
	},
	activated() {
		console.log(this);
		const { ID, ...post } = this.args || {
			title: "",
			content: "",
		};
		this.ID = ID;
		this.post = post;
	},
};
</script>

<style scoped>
h3 {
	margin-bottom: var(--padding-small);
}
</style>