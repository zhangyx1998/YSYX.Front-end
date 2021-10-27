<script setup>
// Top level UI components
import NaviBar from "./Mobile/NaviBar.vue";
import AppPane from "./Mobile/AppPane.vue";
// Application module components
import Forum from "./Mobile/Forum.vue";
import Posts from "/space/UI/Module/Dashboard/Posts.vue";
import Tasks from "./Mobile/Tasks.vue";
import Account from "./Mobile/Panes/IdCard.vue";
import TitleBar from "./Mobile/TitleBar.vue";
// Application Panels
import PlaceHolder from "./Mobile/Panes/PlaceHolder.vue";
import Login from "./Mobile/Panes/Login.vue";
import SelectLanguage from "./Mobile/Panes/SelectLanguage.vue";
// Application Modules
import ProgressInspect from "./Module/ProgressInspect.vue";
import ProgressReport from "./Module/ProgressReport.vue";
import PostManage from "./Module/PostManage.vue";
// UI Components
import Button from "/components/Button.vue";
// Register Modules
const Modules = {
	PlaceHolder: markRaw(PlaceHolder),
	Login: markRaw(Login),
	SelectLanguage: markRaw(SelectLanguage),
	ProgressInspect: markRaw(ProgressInspect),
	ProgressReport: markRaw(ProgressReport),
	PostManage: markRaw(PostManage),
};
</script>

<template>
	<transition-group :name="paneAnimtion">
		<TitleBar
			:class="posterState"
			:title="title"
			:animation="slideTo ? `slide-opacity-${slideTo}` : 'opacity-switch'"
			v-if="!stackDepth || !login"
			@animationend="posterState = init ? '' : posterState"
			style="opacity: 1 !important"
		>
			<template #right>
				<transition-group :name="`slide-opacity-${slideTo || ''}`">
					<Button
						icon="fas fa-plus"
						type="seamless white"
						v-if="login && display == 'Posts' && hasModuleAccess('PostManage')"
						style="--button-padding: 0.5em 0.7em"
						@click="showPane('PostManage')"
					/>
				</transition-group>
			</template>
		</TitleBar>
		<div AppView v-if="!stackDepth">
			<transition :name="slideTo ? `slide-${slideTo}` : 'spring-up'">
				<keep-alive>
					<component
						v-show="init"
						:is="el"
						@show-pane="showPane"
						style="bottom: var(--mobile-navibar-height) !important"
					/>
				</keep-alive>
			</transition>
			<NaviBar
				:display="display"
				@slide-to="(direction) => (slideTo = direction)"
				@switch="(el) => (display = el)"
			/>
		</div>
		<div AppView v-else>
			<keep-alive>
				<component
					:is="paneEl"
					:args="paneArgs"
					@back="exitPane"
					@show-pane="showPane"
				/>
			</keep-alive>
		</div>
	</transition-group>
	<transition name="spring-up">
		<div
			ContentView
			v-if="init && !login && posterState !== 'posterState'"
			:class="posterState"
			style="z-index: 1000; background-color: var(--accent)"
		>
			<Login v-if="!login" />
		</div>
	</transition>
</template>

<script>
// import { Popup, DesktopView } from "/space/View.js";
import { Session, hasModuleAccess } from "/space/Session.js";
import { env, intl } from "/util/env.js";
import { digVal } from "/util/object.js";
import { markRaw } from "@vue/reactivity";

function safeArea() {
	const { innerHeight, innerWidth } = window,
		aspectRatio = innerHeight / innerWidth;
	if (aspectRatio >= 2 || 1 / aspectRatio >= 2) {
		document.documentElement.style.setProperty(
			"--mobile-bottom-safearea",
			"16px"
		);
	}
}

export let ContentView = null;

export default {
	components: { Button },
	data() {
		return {
			env,
			init: false,
			login: false,
			posterState: "poster",
			freeze: false,
			slideTo: "",
			display: "Tasks",
			stackDepth: 0,
			paneStack: [],
			paneAnimtion: "push-left",
		};
	},
	methods: {
		intl,
		hasModuleAccess,
		showPane(pane, args) {
			this.paneAnimtion = "push-left";
			if (pane in this.Modules) {
				this.paneStack.push({
					el: this.Modules[pane],
					args,
				});
			} else {
				this.paneStack.push({
					el: this.Modules.PlaceHolder,
					args: {
						title: intl({
							"en-US": "Internal Error",
							"zh-CN": "应用内部错误",
						}),
						suffix: `Requesting nonexistant module '${pane}', with arguments '${JSON.stringify(
							args,
							null,
							4
						)}'`,
					},
				});
			}
			this.stackDepth = this.paneStack.length;
		},
		exitPane() {
			this.paneAnimtion = "push-right";
			this.paneStack.pop();
			this.stackDepth = this.paneStack.length;
		},
	},
	computed: {
		el() {
			return {
				Forum,
				Posts,
				Tasks,
				Account,
			}[this.display];
		},
		title() {
			return intl(
				{
					Posts: {
						"en-US": "Posts",
						"zh-CN": "公告",
					},
					Forum: {
						"en-US": "Forum",
						"zh-CN": "论坛",
					},
				}[this.display]
			);
		},
		paneEl() {
			const pane = this.paneStack[this.paneStack.length - 1];
			if (pane && typeof pane === "object" && "el" in pane) {
				return pane.el;
			}
			return this.Modules.PlaceHolder;
		},
		paneArgs() {
			const pane = this.paneStack[this.paneStack.length - 1];
			if (pane && typeof pane === "object" && "el" in pane)
				return pane.args;
			return {
				title: intl({
					"en-US": "Internal Error",
					"zh-CN": "应用内部错误",
				}),
				suffix: intl({
					"en-US": "Pane stack smpty",
					"zh-CN": "面板栈已弹空",
				}),
			};
		},
	},
	created() {
		ContentView = this;
		// Listen for env change
		env.on("update", () => {
			this.$forceUpdate();
		});
		// Display SafeArea
		window.onresize = safeArea;
		safeArea();
		// Login listener
		Session.on("login", () => {
			this.login = true;
		});
		// Logout listener
		Session.on("logout", () => {
			this.login = false;
		});
	},
	mounted() {
		const ANIMATION_DELAY = 1200;
		const ANIMATION_TIME = 5000;
		setTimeout(() => {
			Session.init().then(() => {
				this.posterState = "poster-leave";
				this.init = true;
			});
		}, ANIMATION_DELAY);
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
</style>
