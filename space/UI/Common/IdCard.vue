<script setup>
import DirectInputEntry from "./IdCard/DirectInputEntry.vue";
</script>

<template>
	<div
		Content
		style="
			padding-top: 0;
			padding-left: 0;
			padding-right: 0;
			background-color: var(--accent);
		"
	>
		<div
			IdCardHeader
			style="
				position: fixed;
				top: var(--mobile-titlebar-height);
				left: 0;
				right: 0;
				z-index: 999;
			"
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
			IdCard
			ref="IdCard"
			:style="{ 'padding-top': IdCardHeaderHeight + 'px' }"
		>
			<div EntryGroupTitle>
				<span en-US>User Group</span><span zh-CN>分组</span>
			</div>
			<div EntryGroup></div>
			<div EntryGroupTitle>
				<span en-US>Personal Information</span
				><span zh-CN>个人信息</span>
			</div>
			<div EntryGroup>
				<DirectInputEntry :value="profile.Cell" :validate="() => true">
					<span en-US>Cell</span>
					<span zh-CN>电话</span>
				</DirectInputEntry>
				<DirectInputEntry :value="profile.Mail" :validate="() => true">
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
				<DirectInputEntry :value="profile.Major" :validate="() => true">
					<span en-US>Major</span>
					<span zh-CN>专业</span>
				</DirectInputEntry>
			</div>
			<div EntryGroupTitle>
				<span en-US>Interested Fields</span><span zh-CN>兴趣范围</span>
			</div>
			<div EntryGroup></div>
			<div EntryGroupTitle>
				<span en-US>Settings</span><span zh-CN>设置</span>
			</div>
			<div EntryGroup></div>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { locale, Locale } from "/util/locale.js";

let parentEl;
export default {
	emits: ["show-pane", "close-pane"],
	data() {
		return {
			locale,
			IdCardHeaderHeight: 120,
			flexibleHeight: 30,
			scrollTop: 0,
			profile: {},
		};
	},
	watch: {
		scrollTop(val) {
			if (val > this.flexibleHeight) this.scrollTop = this.flexibleHeight;
			if (val < 0) this.scrollTop = 0;
		},
	},
	methods: {
		logout() {
			Session.logout().then();
		},
	},
	mounted() {
		parentEl = this.$refs.IdCard.parentElement;
		parentEl.addEventListener("scroll", () => {
			this.scrollTop = parentEl.scrollTop;
		});
	},
	activated() {
		this.scrollTop = parentEl.scrollTop;
		Session.post("UserProfile").then((profile) => (this.profile = profile));
	},
};
</script>


<style scoped>
[IdCard] {
	display: block;
	width: 100%;
	height: 100vh;
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

::v-deep([EntryGroup] > [Entry]) {
	padding: 0.2em var(--padding);
}

::v-deep([Entry]) {
	display: flex;
	margin: -2px 0;
	border-bottom: 1px solid var(--white-background);
}

::v-deep([Entry]:focus),
::v-deep([Entry]:focus-within) {
	background-color: var(--white-background);
}

::v-deep([Entry] > *) {
}

::v-deep([EntryVal]) {
	flex-grow: 1;
	display: block;
}

::v-deep([EntryAction]) {
}

::v-deep([EntryVal] > [title]) {
	padding-top: 0.4em;
	font-size: 0.8em;
	opacity: 0.6;
}

::v-deep(input) {
	padding: 0.6em 0;
	outline: none;
	border: none;
	background-color: transparent !important;
	color: var(--white);
}
</style>