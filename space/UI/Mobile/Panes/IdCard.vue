<script setup>
import DirectInputEntry from "./IdCard/DirectInputEntry.vue";
import PaneNaviEntry from "./IdCard/PaneNaviEntry.vue";
import Button from "/components/Button.vue";
</script>

<template>
	<div ContentView>
		<div
			IdCardHeader
			style="position: absolute; top: 0; left: 0; right: 0; z-index: 999"
			:style="{
				'--IdCardHeader-height': IdCardHeaderHeight - scrollTop + 'px',
			}"
		>
			<span Avatar>
				<div
					class="shadow-dark"
					style="
						width: 100%;
						height: 100%;
						background-color: var(--accent-bright);
					"
				></div>
			</span>
			<span
				Name
				style="
					width: 0;
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
				"
			>
				<DirectInputEntry
					:value="profile.Name"
					:validate="() => true"
					style="border: none"
				/>
				<span style="font-size: 0.8em; opacity: 0.5"
					>UID<span user-select style="margin: 0 0.5em"
						>zhangyx</span
					></span
				>
			</span>
			<div
				GradientMask
				:style="{
					opacity: scrollTop / flexibleHeight,
					height: scrollTop + 'px',
				}"
			></div>
		</div>
		<div
			Content
			style="
				padding-top: 0;
				padding-left: 0;
				padding-right: 0;
				background-color: var(--accent);
			"
			ref="Content"
		>
			<div IdCard :style="{ 'padding-top': IdCardHeaderHeight + 'px' }">
				<div EntryGroupTitle>
					<span en-US>My groups</span><span zh-CN>我的分组</span>
				</div>
				<div EntryGroup></div>
				<div EntryGroupTitle>
					<span en-US>Personal Information</span
					><span zh-CN>个人信息</span>
				</div>
				<div EntryGroup>
					<DirectInputEntry
						:value="profile.Cell"
						:validate="() => true"
					>
						<span en-US>Cell</span>
						<span zh-CN>电话</span>
					</DirectInputEntry>
					<DirectInputEntry
						:value="profile.Mail"
						:validate="() => true"
					>
						<span en-US>Mail</span>
						<span zh-CN>邮箱</span>
					</DirectInputEntry>
					<DirectInputEntry
						:value="profile.Organization"
						:validate="() => true"
					>
						<span en-US>Institute</span>
						<span zh-CN>所属机构</span>
					</DirectInputEntry>
					<DirectInputEntry
						:value="profile.Major"
						:validate="() => true"
					>
						<span en-US>Major</span>
						<span zh-CN>专业</span>
					</DirectInputEntry>
				</div>
				<div EntryGroupTitle>
					<span en-US>Interested Fields</span
					><span zh-CN>兴趣范围</span>
				</div>
				<div EntryGroup></div>
				<div EntryGroupTitle>
					<span en-US>Settings</span><span zh-CN>设置</span>
				</div>
				<div EntryGroup>
					<PaneNaviEntry
						@click="this.$emit('show-pane', 'SelectLanguage')"
					>
						<span en-US>Language</span>
						<span zh-CN>语言</span>
					</PaneNaviEntry>
					<PaneNaviEntry
						@click="this.$emit('show-pane', 'ChangePassword')"
					>
						<span en-US>Change Password</span>
						<span zh-CN>更改密码</span>
					</PaneNaviEntry>
					<PaneNaviEntry @click="this.$emit('show-pane', 'Feedback')">
						<span en-US>Feedback</span>
						<span zh-CN>反馈</span>
					</PaneNaviEntry>
				</div>
				<div actions>
					<Button
						type="solid red"
						style="--button-padding: 0.6em 2em"
						:name="
							intl({
								'en-US': 'Log out',
								'zh-CN': '退出登录',
							})
						"
						@click="logout()"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { intl } from "/util/env.js";

let ContentEl;
export default {
	emits: ["show-pane", "close-pane"],
	data() {
		return {
			IdCardHeaderHeight: 120,
			flexibleHeight: 30,
			scrollTop: 0,
			profile: Session.data.Profile,
		};
	},
	watch: {
		scrollTop(val) {
			if (val > this.flexibleHeight) this.scrollTop = this.flexibleHeight;
			if (val < 0) this.scrollTop = 0;
		},
	},
	methods: {
		intl,
		logout() {
			Session.logout().then();
		},
		fetch() {
			Session.post("UserProfile").then((data) => (this.profile = data));
		},
	},
	mounted() {
		ContentEl = this.$refs.Content;
		ContentEl.addEventListener("scroll", () => {
			this.scrollTop = ContentEl.scrollTop;
		});
	},
	activated() {
		this.scrollTop = ContentEl.scrollTop;
		this.fetch();
	},
};
</script>


<style scoped>
[IdCard] {
	display: block;
	width: 100%;
	margin: 0;
}

[IdCard] > * {
	width: auto;
}

/* IdCardHeader */
[GradientMask] {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	/* Background Fallback */
	background: transparent;
	/* Background Gradient */
	background: linear-gradient(
		180deg,
		hsla(212, 65%, 31%, 1) 0%,
		hsla(212, 65%, 31%, 0) 50%
	);
	pointer-events: none;
}

[IdCardHeader] {
	display: flex;
	color: var(--white);
	height: var(--IdCardHeader-height);
	background-color: var(--accent);
	padding: 0 1.2em;
}

[IdCardHeader] > * {
	height: 100%;
	padding: 1.2em 0;
	overflow: hidden;
	box-sizing: border-box;
}

[Avatar] {
	margin-right: 1.2em;
	width: calc(var(--IdCardHeader-height) - 2.4em);
}

[Avatar] > * {
	border-radius: 100%;
	overflow: hidden;
}
/* Actions */
[Actions] {
	display: flex;
	justify-content: space-evenly;
}

/* EntryGroup */
[EntryGroupTitle],
[EntryGroup] {
	color: var(--white);
	margin: var(--padding);
}

[EntryGroupTitle] {
	font-size: 0.9em;
	opacity: 0.8;
	margin-bottom: -0.5em;
	padding: 0 var(--padding-small);
}

[EntryGroup] {
	background-color: var(--white-background);
	min-height: 3em;
	border-radius: 1em;
	overflow: hidden;
	--button-margin: 0;
	--button-padding: 0;
}
</style>