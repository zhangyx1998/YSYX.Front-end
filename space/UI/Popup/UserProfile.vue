<script setup>
import Button from "../Common/Button.vue";
</script>

<template>
    <div Login class="popup" v-if="_popup_.show">
        <div class="_popup_warper_">
            <h2 en-us>My Profile</h2>
            <h2 zh-cn>我的信息</h2>
            <p v-for="el in Profile" :key="el">
                {{ el }}: {{ JSON.stringify(Profile[el]) }}
            </p>
            <Button
                type="seamless"
                icon=""
                name="close"
                @click="Popup.close(this)"
            />
            <Button
                type="seamless"
                icon="codicon codicon-account"
                name="Logout"
                @click="logout()"
            />
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
            Profile: {},
        };
    },
    methods: {
        logout() {
            Session.post("logout").then(({ login }) => {
				Session.call("logout");
            });
        },
    },
    created() {
        // Window management
        window.UserProfilePopup = this;
        Popup.register(this);
        Popup.on("UserProfile", () => Popup.show(this));
        // Data management
        Session.on("Profile", (Profile) => {
            this.Profile = Profile;
        });
    },
};
</script>

<style scoped>
input {
    /* Layout */
    padding: 0.5em;
    /* Appearance */
    background-color: #f0f0f0;
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