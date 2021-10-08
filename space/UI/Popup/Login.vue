<script setup>
import Button from "../Common/Button.vue";
</script>

<template>
    <div Login class="popup" v-if="_popup_.show">
        <div class="_popup_warper_">
            <h2 en-us>Sign In</h2>
            <h2 zh-cn>登录</h2>
            <input v-model="login_ID" placeholder="ID, Cell or Email" spellcheck="false"/>
            <input
                v-model="login_Password"
                placeholder="Password"
                type="password"
            />
			<div style="display: flex; justify-content: end; font-size: 0.9em">
				<Button
					type="seamless"
					icon=""
					name="Apply"
				/>
				<Button
					type="seamless"
					icon="codicon codicon-account"
					name="Login"
					@click="login()"
				/>
			</div>
        </div>
    </div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Popup, AppView } from "/space/View.js";
export default {
    data() {
        return {
            _popup_: {
                ID: 0,
                show: false,
            },
            pend: false,
        };
    },
    methods: {
        login() {
            this.pend = true;
            Session.login(this.login_ID, this.login_Password).then(
                ({ login }) => {
                    this.pend = false;
                    if (login) {
                        Popup.close(this);
                    } else {
                        alert("login failed");
                    }
                }
            );
        },
    },
    created() {
        window.LoginPopup = this;
		Popup.register(this);
        Session.on("logout", () => {
			Popup.show(this);
        });
    },
};
</script>

<style scoped>
input {
	/* Layout */
	padding: 0.5em;
	/* Appearance */
	background-color: #F0F0F0;
	/* Appearance - border */
	outline: none;
	border: none;
	border-radius: 0;
	border-left: 2px solid transparent;
}

input:focus {
	border: none;
	border-left: 2px solid var(--accent);
}
</style>