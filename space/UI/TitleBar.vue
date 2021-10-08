<script setup>
import Button from "./Common/Button.vue";
</script>

<template>
    <div TitleBar class="UI-Top">
        <img src="/res/YSYX.png" style="height: 1.2em; margin-right: 0" />
        <span
            style="
                margin: 0 0.8em;
                height: 60%;
                width: 1px;
                background-color: var(--gray);
                opacity: 0.5;
            "
        ></span>
        <span style="margin-left: 0; display: flex; color: var(--accent-dark)">
            <span zh-cn>个人空间</span>
            <span en-us>User Space</span>
        </span>
        <span style="flex-grow: 1"></span>
        <Button
            type="seamless"
            icon="codicon codicon-account"
            :name="displayName()"
            @click="Popup.call('UserProfile')"
        />
    </div>
</template>

<script>
import { Session } from "/space/Session.js";
import { Popup, AppView } from "/space/View.js"
export default {
    data() {
        return {
            ID: "",
            Name: "",
        };
    },
    methods: {
        displayName() {
            return this.Name || this.ID || "N/A";
        },
    },
    created() {
        window.TitleBarVM = this;
        Session.on("Profile", ({ Name }) => {
			this.Name = Name ? Name : '';
			this.ID = Session.ID;
        });
    },
};
</script>

<style>
div[TitleBar] {
    box-sizing: border-box;
    /* Positioning */
    left: 0;
    top: 0;
    width: 100vw;
    height: var(--TitleBarHeight);
    /* Layout */
    display: flex;
    align-items: center;
    padding: 0 var(--Padding);
    /* Appearance */
    font-size: 1.2em;
    border-bottom: 1px solid #cccccc;
}
</style>
