<script setup>
// UI Components
import TitleBar from "/space/UI/Mobile/TitleBar.vue";
import NaviBar from "./NaviBar.vue";
// Form Components
import Step_0 from "./Steps/0.Blank.vue";
import Step_1 from "./Steps/1.BasicInfo.vue";
import Step_2 from "./Steps/2.UserRole.vue";
import Step_3 from "./Steps/3.AdditionalInfo.vue";
import Step_4 from "./Steps/4.Confirm.vue";
</script>

<template>
	<span :class="[locale.$, 'mobile']">
		<div AppView>
			<TitleBar
				:title="
					{ 'en-US': 'Apply', 'zh-CN': '一生一芯报名表' }[locale.$]
				"
			/>
			<div ContentView>
				<transition :name="slideTo ? `slide-${slideTo}` : 'spring-up'">
					<keep-alive>
						<component
							:is="el"
							@update="update"
							:identity="this.formData.identity"
							:FormData="FormData"
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
				:FormData="FormData"
				@submit="submit"
			/>
		</div>
	</span>
</template>

<script>
import { locale } from "/util/locale.js";

export default {
	components: { NaviBar },
	data() {
		return {
			locale,
			step: null,
			slideTo: "",
			formData: {
				Name: "",
				Cell: "",
				Mail: "",
				identity: "",
				School: "",
				likes: [],
				College: "",
				Title: "",
				Major: "",
				Resume: null,
				Remark: "",
			},
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
				this.formData.Name && this.formData.Cell && this.formData.Mail,
				this.formData.identity,
				this.formData.School &&
					(this.formData.identity === "student"
						? this.formData.likes.length && this.formData.Major
						: this.formData.identity === "teacher"
						? this.formData.College && this.formData.Title
						: this.formData.Major),
				true,
			][this.step];
		},
		FormData() {
			let {
				Name,
				Cell,
				Mail,
				identity,
				School,
				likes,
				College,
				Title,
				Major,
				Resume,
				Remark,
			} = this.formData;
			if (this.formData.identity === "student") {
				return {
					Name,
					Cell,
					Mail,
					identity,
					School,
					likes,
					Major,
					Resume: !Resume ? "(未上传)" : Resume,
					Remark: !Remark ? "(未填写)" : Remark,
				};
			} else if (this.formData.identity === "ta") {
				return {
					Name,
					Cell,
					Mail,
					identity,
					School,
					Major,
					Resume: !Resume ? "(未上传)" : Resume,
					Remark: !Remark ? "(未填写)" : Remark,
				};
			} else {
				return {
					Name,
					Cell,
					Mail,
					identity,
					School,
					College,
					Title,
					Resume: !Resume ? "(未上传)" : Resume,
					Remark: !Remark ? "(未填写)" : Remark,
				};
			}
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
			data.Resume = await new Promise((resolve, reject) => {
				var reader = new FileReader();
				reader.readAsBinaryString(this.formData.Resume);
				reader.onload = function (e) {
					var urlData = this.result;
					resolve(btoa(urlData));
				};
			});
			console.log(data);
		},
	},
	watch: {
		step(newVal, oldVal) {
			if (oldVal !== null)
				this.slideTo = newVal > oldVal ? "left" : "right";
		},
	},
	mounted() {
		this.step = 1;
		console.log(this);
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
}

* {
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

input {
	width: 100%;
}

[Form] {
	font-size: 1.2em;
	display: block;
	width: 100%;
	height: 110vh;
}

[Form] > * {
	width: auto;
}

[Entry] {
	border-left: 2px solid transparent;
}

[Entry]:focus-within {
	border-left: 2px solid var(--accent);
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

[EntryGroup] {
	min-height: 3em;
	overflow: hidden;
}

[EntryGroup] > [Entry] {
	padding: 0.2em var(--padding);
	margin: var(--padding) 0;
}

[Entry] {
	display: flex;
	margin: -2px 0;
	border-bottom: 1px solid var(--white-background);
}

[Entry]:focus,
[Entry]:focus-within {
	background-color: var(--accent-background);
}

[Entry] > * {
}

[EntryVal] {
	flex-grow: 1;
	display: block;
}

[EntryAction] {
}

[EntryVal] > [title] {
	padding: 0.4em 0;
	font-size: 0.8em;
	opacity: 0.6;
}

input {
	width: 100%;
	padding: 0.6em 0;
	outline: none;
	border: none;
	background-color: transparent !important;
	/* color: var(--white); */
}
</style>