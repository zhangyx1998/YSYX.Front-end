<script setup>
// Top level UI components
import NaviBar from "./Mobile/NaviBar.vue";
import AppPane from "./Mobile/AppPane.vue";
// Application module components
import Forum from "./Mobile/Forum.vue";
import Tasks from "./Mobile/Tasks.vue";
import UserInfo from "./Mobile/UserInfo.vue";
import TitleBar from "./Mobile/TitleBar.vue";
// Application Panels
import PlaceHolder from "./Mobile/Panes/PlaceHolder.vue";
import Login from "./Mobile/Panes/Login.vue";
// Application Modules
import ProgressInspect from "./Module/ProgressInspect.vue";
import ProgressReport from "./Module/ProgressReport.vue";
</script>

<template>
	<transition-group :name="paneAnimtion">
		<TitleBar
			:class="poster"
			v-if="!stackDepth || !login"
			@animationend="poster = init ? '' : poster"
			style="opacity: 1 !important"
		/>
		<div
			AppView
			v-if="!stackDepth"
			style="padding-bottom: var(--mobile-navibar-height)"
		>
			<div ContentView>
				<transition :name="slideTo || 'spring-up'">
					<keep-alive>
						<component
							v-show="init"
							:is="el"
							@show-pane="showPane"
						/>
					</keep-alive>
				</transition>
			</div>
			<NaviBar
				:display="display"
				@slide-to="(direction) => (slideTo = `slide-${direction}`)"
				@switch="(el) => (display = el)"
			/>
		</div>
		<div AppView v-if="stackDepth">
			<keep-alive>
				<component
					:is="paneEl()"
					:data="paneArgs()"
					@back="exitPane()"
					@show-pane="showPane()"
				/>
			</keep-alive>
		</div>
	</transition-group>
	<transition name="spring-up">
		<div
			ContentView
			v-if="init && !login && poster !== 'poster'"
			:class="poster"
			style="z-index: 1000; background-color: var(--accent)"
		>
			<Login v-if="!login" />
		</div>
	</transition>
</template>

<script>
// import { Popup, DesktopView } from "/space/View.js";
import { Session } from "/space/Session.js";
import { locale, Locale } from "/util/locale.js";
import { markRaw } from "@vue/reactivity";

function safeArea() {
	const { innerHeight, innerWidth } = window,
		aspectRatio = innerHeight / innerWidth;
	if (aspectRatio >= 2) {
		document.documentElement.style.setProperty(
			"--mobile-bottom-safearea",
			"16px"
		);
	}
}

export let ContentView = null;

const Modules = {
	PlaceHolder: markRaw(PlaceHolder),
	Login: markRaw(Login),
	ProgressInspect: markRaw(ProgressInspect),
	ProgressReport: markRaw(ProgressReport),
};

export default {
	data() {
		return {
			init: false,
			login: false,
			poster: "poster",
			freeze: false,
			slideTo: "",
			display: "",
			stackDepth: 0,
			paneStack: [],
			paneAnimtion: "push-left",
		};
	},
	methods: {
		showPane(pane, args) {
			this.paneAnimtion = "push-left";
			if (pane in Modules) {
				this.paneStack.push({
					el: Modules[pane],
					args,
				});
			} else {
				this.paneStack.push({
					el: Modules.PlaceHolder,
					args: {
						title: {
							"en-US": "Internal Error",
							"zh-CN": "应用内部错误",
						}[locale.$],
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
		paneEl() {
			const pane = this.paneStack[this.paneStack.length - 1];
			if (pane && typeof pane === "object" && "el" in pane) {
				return pane.el;
			}
			return Modules.PlaceHolder;
		},
		paneArgs() {
			const pane = this.paneStack[this.paneStack.length - 1];
			if (pane && typeof pane === "object" && "el" in pane)
				return pane.args;
			return {
				title: {
					"en-US": "Internal Error",
					"zh-CN": "应用内部错误",
				}[locale.$],
				suffix: {
					"en-US": "Pane stack smpty",
					"zh-CN": "面板栈已弹空",
				}[locale.$],
			};
		},
	},
	watch: {
		slideTo(val) {
			console.log(val);
		}
	},
	computed: {
		el() {
			return {
				Forum,
				Tasks,
				UserInfo,
			}[this.display];
		},
	},
	created() {
		ContentView = this;
		// Listen for locale change
		Locale.on("update", () => {
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
				this.poster = "poster-leave";
				this.init = true;
			});
		}, ANIMATION_DELAY);
		Session.on("login", () => {
			this.display = "Tasks";
		});
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
