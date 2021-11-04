<script setup>
// UI Components
import MobileTitleBar from "/components/MobileTitleBar.vue";
import NaviBar from "./NaviBar.vue";
import Progress from "./Progress.vue";
// Form Components
import Step_0 from "./Steps/0.Blank.vue";
import Step_1 from "./Steps/1.BasicInfo.vue";
import Step_2 from "./Steps/2.UserRole.vue";
import Step_3 from "./Steps/3.AdditionalInfo.vue";
import Step_4 from "./Steps/4.Confirm.vue";
</script>

<template>
	<span :class="[env.locale, 'mobile']">
		<div
			AppView
			:style="{
				left: viewSpace,
				right: viewSpace,
			}"
			class="shadow"
		>
			<MobileTitleBar class="white" title=" ">
				<div
					style="
						display: flex;
						align-items: center;
						justify-content: center;
					"
				>
					<img style="height: 1em" src="/res/YSYX.png" />
					<span
						style="
							margin: 0 0.6em;
							width: 0.1em;
							height: 1em;
							background-color: var(--accent);
						"
					></span>
					<span
						style="height: 1em; line-height: 1em; font-weight: 600"
					>
						{{
							intl({
								"en-US": "Apply",
								"zh-CN": "报名",
							})
						}}
					</span>
				</div>
			</MobileTitleBar>
			<div ContentView>
				<Progress
					:step="step"
					:class="contentScrolled ? 'shadow' : ''"
					:steps="[
						{ 'zh-CN': '基本信息','en-US': 'Basic information' },	
						{ 'zh-CN': '身份选择' ,'en-US': 'Identity selection'},
						{ 'zh-CN': '详细信息' ,'en-US':'Detailed information'},
						{ 'zh-CN': '确认并提交','en-US':'Confirm submission' },
					]"
					@update-height="(height) => (this.contentTop = height)"
				/>
				<transition :name="slideTo ? `slide-${slideTo}` : 'spring-up'">
					<keep-alive>
						<component
							:is="el"
							@update="update"
							:identity="this.formData.identity"
							:formData="formData"
							:renderData="renderData"
							@scroll="
								(e) =>
									(this.contentScrolled =
										!!e.target.scrollTop)
							"
							style="
								bottom: var(--mobile-navibar-height) !important;
							"
							:style="{ 'padding-top': `${contentTop}px` }"
						/>
					</keep-alive>
				</transition>
			</div>
			<NaviBar
				:back="step > 1"
				:forward="step < 4"
				:valid="stepValid"
				@forward="step++"
				@back="step--"
				@submit="submit"
			/>
		</div>
	</span>
</template>

<script>
import { intl, env } from "/util/env.js";

export default {
	components: { NaviBar, Progress },
	data() {
		return {
			env,
			step: null,
			contentScrolled: false,
			contentTop: 0,
			slideTo: "",
			renderData: {
				cellValid: false,
				mailValid: false,
				mailLoading: false,
				cellLoading: false,
			},
			formData: {
				name: "",
				cell: "",
				mail: "",
				identity: "",
				institution: "",
				direction: [],
				faculty: "",
				title: "",
				major: "",
				resume: null,
				remark: "",
				institutionAltName: "",
			},
			viewSpace: "0px",
		};
	},
	computed: {
		el() {
			return [
				Step_0,
				Step_1, // emits: ['forward']
				Step_2, // emits: ['back', 'forward']
				Step_3, // emits: ['back', 'forward']
				Step_4, // emits: ['back', 'confirm']
			][this.step];
		},
		stepValid() {
			return !![
				true,
				this.formData.name &&
					this.renderData.cellValid &&
					this.renderData.mailValid,
				this.formData.identity,
				(this.formData.institution || this.formData.institutionAltName) &&
					(this.formData.identity === "student"
						? this.formData.direction.length && this.formData.major
						: this.formData.identity === "teacher"
						? this.formData.faculty && this.formData.title
						: this.formData.major),
				true,
			][this.step];
		},
	},
	methods: {
		update(entryName, data) {
			if (entryName in this.formData) {
				this.formData[entryName] = data;
			}
			console.log(entryName, data);
			this.$forceUpdate();
		},
		async submit() {
			let data = Object.assign({}, this.formData);
			if (!!this.formData.resume) {
				data.resume = await new Promise((resolve, reject) => {
					var reader = new FileReader();
					reader.readAsBinaryString(this.formData.resume);
					reader.onload = function (e) {
						var urlData = this.result;
						resolve(btoa(urlData));
					};
				});
			}
			console.log(data);
		},
		updateViewSpace() {
			console.log(
				(this.viewSpace =
					(window.innerWidth > 480
						? (window.innerWidth - 480) / 2
						: 0) + "px")
			);
		},
		intl,
	},
	watch: {
		step(newVal, oldVal) {
			if (oldVal !== null)
				this.slideTo = newVal > oldVal ? "left" : "right";
		},
		"formData.mail"(value) {
			if (value) {
				this.renderData.mailLoading = true;
				fetch("http://api.ysyx.org:8100/apply/exist", {
					method: "POST",
					body: JSON.stringify({
						mail: value,
					}),
				})
					.then((res) => res.json())
					.then((exist) => {
						this.renderData.mailValid = !exist;
						this.renderData.mailLoading = false;
					});
			} else {
				this.renderData.mailValid = false;
			}
		},
		"formData.cell"(value) {
			if (value) {
				this.renderData.cellLoading = true;
				fetch("http://api.ysyx.org:8100/apply/exist", {
					method: "POST",
					body: JSON.stringify({
						cell: value,
					}),
				})
					.then((res) => res.json())
					.then((exist) => {
						this.renderData.cellValid = !exist;
						this.renderData.cellLoading = false;
					});
			} else {
				this.renderData.cellValid = false;
			}
		},
	},
	mounted() {
		this.step = 1;
		console.log(this);
		window.addEventListener("resize", () => this.updateViewSpace());
		this.updateViewSpace();
	},
};
</script>

<style>
:root {
	/* Variables */
	--mobile-bottom-safearea: 0px;
	--mobile-navibar-content: 4.2em;
	--mobile-navibar-height: calc(
		var(--mobile-navibar-content) + var(--mobile-bottom-safearea)
	);
	--mobile-titlebar-height: 3.6em;
	font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", Helvetica,
		Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* Common Variables */
	--TitleBarHeight: 3rem;
	--SideBarWidth: 13rem;
	--padding: 1rem;
	--padding-large: 2rem;
	--padding-small: 0.6rem;
}
* {
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

input {
	width: 100%;
}

[ContentView] {
	width: 100%;
}

[Entry] {
	border-left: 2px solid transparent;
}

[IdCard] {
	font-size: 1.2em;
	display: block;
	width: 100%;
	height: 100vh;
}

[IdCard] > * {
	width: auto;
}

/* EntryGroup */
[EntryGroup] > [Entry] {
	padding: 0.2em var(--padding);
	margin: var(--padding) 0;
}

[Entry] {
	display: flex;
	margin: -2px 0;
	border-bottom: 1px solid var(--white-background);
}

[EntryVal] {
	flex-grow: 1;
	display: block;
}
</style>