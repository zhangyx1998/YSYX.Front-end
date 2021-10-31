<script setup>
// UI Components
import MobileTitleBar from "/components/MobileTitleBar.vue";
import NaviBar from "./NaviBar.vue";
import Progress from "./Progress.vue";
// Form Components
import Step_0 from "./Steps/0.Blank.vue";
import Step_1 from "./Steps/1.BasicInfo.vue";
import Step_2 from "./Steps/2.UserRole.vue";
import Step_3 from "./Steps/3.AdditionalInfo.vue";
import Step_4 from "./Steps/4.Confirm.vue";
</script>

<template>
    <span :class="[env.locale, 'mobile']">
        <div AppView>
            <MobileTitleBar
                :title="intl({ 'en-US': 'Apply', 'zh-CN': '一生一芯报名表' })"
            />
            <Progress />
            <div ContentView>
                <transition :name="slideTo ? `slide-${slideTo}` : 'spring-up'">
                    <keep-alive>
                        <component
                            :is="el"
                            @update="update"
                            :identity="this.formData.identity"
                            :formData="formData"
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
                @submit="submit"
            />
        </div>
    </span>
</template>

<script>
import { intl, env } from "/util/env.js";

export default {
    components: { NaviBar, Progress },
    data() {
        return {
            env,
            step: null,
            slideTo: "",
            formData: {
                name: "",
                cell: "",
                mail: "",
                identity: "",
                institution: "",
                direction: [],
                faculty: "",
                title: "",
                major: "",
                resume: null,
                remark: "",
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
                this.formData.name && this.formData.cell && this.formData.mail,
                this.formData.identity,
                this.formData.institution &&
                    (this.formData.identity === "student"
                        ? this.formData.direction.length && this.formData.major
                        : this.formData.identity === "teacher"
                        ? this.formData.faculty && this.formData.title
                        : this.formData.major),
                true,
            ][this.step];
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
            if (!!this.formData.resume) {
                data.resume = await new Promise((resolve, reject) => {
                    var reader = new FileReader();
                    reader.readAsBinaryString(this.formData.resume);
                    reader.onload = function (e) {
                        var urlData = this.result;
                        resolve(btoa(urlData));
                    };
                });
            }
            console.log(data);
        },
        intl,
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
    font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Common Variables */
    --TitleBarHeight: 3rem;
    --SideBarWidth: 13rem;
    --padding: 1rem;
    --padding-large: 2rem;
    --padding-small: 0.6rem;
}
* {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

input {
    width: 100%;
}

[ContentView] {
    width: 100%;
}

[Form] {
    font-size: 1.2em;
    display: block;
    height: 110vh;
    margin-top: calc(var(--mobile-titlebar-height) + var(--padding));
}

[Form] > * {
    width: auto;
}

[Entry] {
    border-left: 2px solid transparent;
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
    display: block;
    margin-bottom: 7px;
    font-weight: 400;
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