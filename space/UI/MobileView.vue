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
	<div :class="poster" v-if="!stack() && login">
		<!-- <div Banner>
				<img src="/res/YSYX.png" />
			</div> -->
		<TitleBar />
		<div MobileView with-mobile-navibar>
			<div style="padding: var(--padding)">
				<keep-alive>
					<component :is="el" @show-pane="showPane" />
				</keep-alive>
			</div>
		</div>
		<NaviBar
			:display="this.display"
			@switch="(el) => (this.display = el)"
		/>
	</div>
	<div v-else-if="login">
		<component
			:is="paneEl()"
			:data="paneArgs()"
			@exit-pane="exitPane()"
			@show-pane="showPane()"
		/>
	</div>
	<div v-else :class="poster">
		<Login />
	</div>
</template>

<script>
// import { Popup, DesktopView } from "/space/View.js";
import { Session } from "/space/Session.js";
import { locale, Locale } from "/util/locale.js";
import { markRaw } from "@vue/reactivity";

function safeArea() {
	const { innerHeight, innerWidth } = window,
		aspectRatio = innerHeight / innerWidth;
	if (aspectRatio >= 1.8) {
		document.documentElement.style.setProperty(
			"--mobile-bottom-safearea",
			"16px"
		);
	}
}

export let MobileView = null;

const Modules = {
	PlaceHolder: markRaw(PlaceHolder),
	Login: markRaw(Login),
	ProgressInspect: markRaw(ProgressInspect),
	ProgressReport: markRaw(ProgressReport),
};

export default {
	data() {
		return {
			login: false,
			poster: "poster",
			freeze: false,
			display: "ModuleList",
			paneStack: [],
		};
	},
	methods: {
		showPane(pane, args) {
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
			this.$forceUpdate();
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
		stack() {
			return this.paneStack.length > 0;
		},
		exitPane() {
			this.paneStack.pop();
			this.$forceUpdate();
		},
	},
	created() {
		MobileView = window.MobileView = this;
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
		const ANIMATION_TIME = 1200;
		setTimeout(() => {
			this.poster = "poster-leave";
			setTimeout(() => {
				this.poster = "";
			}, ANIMATION_TIME);
		}, ANIMATION_DELAY);
		this.display = "Tasks";
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
	--load-animation-duration: 1s;
	--load-animation-curve: cubic-bezier(0.3, 0, 0, 1);
}

* {
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.mobile [MobileView] {
	/* Positioning */
	padding-top: var(--mobile-titlebar-height);
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
	background-color: white;
	/* Layout */
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background-color: var(--gray-background);
}

.mobile [MobileView][with-mobile-navibar] {
	padding-bottom: var(--mobile-navibar-height);
}
</style>

<style scoped>
/* Banner animation */
[Banner] {
	/* Positioning */
	position: fixed;
	left: 0;
	right: 0;
	/* Sizing */
	width: 100%;
	/* Appearance */
	background-color: var(--accent);
	/* Layout */
	z-index: 2000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.8em var(--padding);
	height: var(--mobile-titlebar-height);
}

:not(.poster) > [Banner] {
	animation-name: uncover;
	animation-duration: var(--load-animation-duration);
	animation-timing-function: var(--load-animation-curve);
}

.poster > [Banner] {
	height: 100%;
	background-color: white;
}

@keyframes uncover {
	from {
		height: 100%;
		background-color: white;
	}

	to {
		height: var(--mobile-titlebar-height);
		background-color: var(--accent);
	}
}

/* Banner LOGO image animation */
[Banner] img {
	height: 1.6em;
	filter: brightness(100) saturate(0);
}

.poster > [Banner] img {
	filter: none;
	transform: scale(1.6);
	/* Fade in */
	animation-name: fade-in;
	animation-duration: 0.5s;
	animation-timing-function: var(--load-animation-curve);
}

:not(.poster) > [Banner] img {
	animation-name: scale;
	animation-duration: var(--load-animation-duration);
	animation-timing-function: var(--load-animation-curve);
}

@keyframes scale {
	from {
		filter: none;
		transform: scale(1.6);
	}

	10% {
		filter: saturate(0.6);
	}

	to {
		filter: brightness(100) saturate(0);
		transform: none;
	}
}

@keyframes fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}
</style>
