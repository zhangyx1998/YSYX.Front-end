<script setup>
// UI Components
import TitleBar from "/space/UI/Mobile/TitleBar.vue";
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
                :title="{ 'en-US': 'Apply', 'zh-CN': '提交申請' }[locale.$]"
            />
            <div ContentView>
                <component :is="el" @forward="step++" />
            </div>
        </div>
    </span>
</template>

<script>
import { locale } from "/util/locale.js";

export default {
    data() {
        return {
            locale,
            step: 0,
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
