<script setup>
import Button from "/space/UI/Common/Button.vue";
</script>

<template>
	<div Login>
		<h2 en-US>Sign In</h2>
		<h2 zh-CN>登录</h2>
		<input
			ref="UserIDInput"
			:placeholder="
				{
					'en-US': 'ID, Cell or Email',
					'zh-CN': 'ID / 电话 / 邮箱',
				}[locale.$]
			"
			spellcheck="false"
			v-model="login_ID"
			:class="[
				login_ID_Valid === null
					? ''
					: login_ID_Valid
					? 'valid'
					: 'invalid',
			]"
			@keydown.enter="this.$refs.PasswordInput.focus()"
		/>
		<input
			ref="PasswordInput"
			:placeholder="
				(login_Successful === false
					? {
							'en-US': 'Invalid Credentials',
							'zh-CN': '无效的用户名或密码',
					  }
					: {
							'en-US': 'Password',
							'zh-CN': '密码',
					  })[locale.$]
			"
			type="password"
			v-model="login_Password"
			:class="[
				(login_Password_Valid || login_Successful) === null
					? ''
					: login_Password_Valid || login_Successful
					? 'valid'
					: 'invalid',
			]"
			@keydown.enter="login()"
		/>
		<div
			style="
				display: flex;
				justify-content: end;
				font-size: 1rem;
				--button-margin: 0;
				--button-padding: 0.5em 1.2em;
			"
		>
			<Button type="link" name="Apply" />
			<span style="flex-grow: 1"></span>
			<Button
				type="solid green"
				:name="
					{
						'en-US': 'Login',
						'zh-CN': '登录',
					}[locale.$]
				"
				@click="login()"
			/>
		</div>
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { locale } from "/util/locale.js";

export default {
	emits: ["show-pane", "back"],
	data() {
		return {
			locale,
			_popup_: {
				ID: 0,
				show: false,
			},
			pend: false,
			login_ID: "",
			login_Password: "",
			login_Successful: null,
		};
	},
	methods: {
		login() {
			this.pend = true;
			if (this.login_ID_Valid && this.login_Password_Valid)
				Session.login(this.login_ID, this.login_Password).then(
					({ login }) => {
						this.pend = false;
						// Always clear password
						this.login_Password = "";
						if (!login) {
							this.login_Successful = false;
						}
					}
				);
			else {
				alert("Invalid credentials");
			}
		},
	},
	computed: {
		login_ID_Valid() {
			const val = this.login_ID || "";
			if (typeof val === "string" && val.trim().length >= 5) {
				return true;
			} else {
				if (val.trim().length) return false;
				else return null;
			}
		},
		login_Password_Valid() {
			const val = this.login_Password || "";
			if (typeof val === "string" && val.length >= 5) {
				return true;
			} else {
				if (val.length) return false;
				else return null;
			}
		},
	},
};
</script>

<style scoped>
[Login] {
	/* Position */
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	/* Layout */
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-grow: 1;
	font-size: 1.6em;
	/* Appearence */
	padding: var(--padding-large);
	padding-bottom: calc(var(--padding-large) + var(--mobile-titlebar-height));
}

[Login] > * {
	margin: 1rem 0;
	color: var(--gray-brighter) !important;
}

h2 {
	font-weight: normal;
}

input {
	color: var(--gray-brighter) !important;
	/* Layout */
	padding: 0.8em;
	/* Appearance */
	background-color: var(--gray-background);
	/* Appearance - border */
	font-size: 1.2rem;
	font-weight: lighter !important;
	outline: none;
	border: none;
	/*  */
}

input.valid {
	background-color: var(--green-background);
}

input.invalid {
	background-color: var(--red-background);
}

input:focus {
	border: none;
	border-left: 2px solid var(--accent);
}

::placeholder {
	color: var(--gray-brighter);
	opacity: 0.6;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	transition: all 0s 50000s;
}
</style>