<script setup>
import Button from "/space/UI/Common/Button.vue";
</script>

<template>
	<div Login class="popup" v-if="_popup_.show">
		<div class="_popup_warper_">
			<h2 en-US>Sign In</h2>
			<h2 zh-CN>登录</h2>
			<input
				tabindex="0"
				ref="UserIDInput"
				:placeholder="
					{
						'en-US': 'ID, Cell or Email',
						'zh-CN': 'ID / 电话 / 邮箱',
					}[locale.$]
				"
				spellcheck="false"
				v-model="login_ID"
				:class="
					[login_ID_Valid === null
						? ''
						: (login_ID_Valid
						? 'valid'
						: 'invalid')]
				"
				@keydown.enter="this.$refs.PasswordInput.focus()"
			/>
			<input
				tabindex="0"
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
				:class="
					[(login_Password_Valid || login_Successful) === null
						? ''
						: ((login_Password_Valid || login_Successful)
						? 'valid'
						: 'invalid')]
				"
				@keydown.enter="login()"
			/>
			<div style="display: flex; justify-content: end; font-size: 0.9em; --button-margin: 0;">
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
	</div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Popup, DesktopView } from "/space/View.js";
import { locale } from "/util/locale.js";
export default {
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
			this.$forceUpdate();
			if (this.login_ID_Valid && this.login_Password_Valid)
				Session.login(this.login_ID, this.login_Password).then(
					({ login }) => {
						this.pend = false;
						if (login) {
							Popup.close(this);
						} else {
							this.login_Password = "";
							this.login_Successful = false;
						}
					}
				);
			else {
				alert('Invalid credentials')
			}
		},
	},
	computed: {
		login_ID_Valid() {
			const val = this.login_ID || '';
			if (typeof val === "string" && val.trim().length >= 5) {
				return true;
			} else {
				if (val.trim().length) return false;
				else return null;
			}
		},
		login_Password_Valid() {
			const val = this.login_Password || '';
			if (typeof val === "string" && val.length >= 5) {
				return true;
			} else {
				if (val.length) return false;
				else return null;
			}
		}
	},
	created() {
		console.log(this);
		Popup.register(this);
		Session.on("logout", () => {
			Popup.show(this);
		});
	}
};
</script>

<style scoped>
input {
	/* Layout */
	padding: 0.5em;
	/* Appearance */
	background-color: var(--gray-background);
	/* Appearance - border */
	outline: none;
	border: none;
	border-radius: 0;
	border-left: 2px solid transparent;
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
</style>