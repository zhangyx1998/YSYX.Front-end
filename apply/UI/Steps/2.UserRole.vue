<script setup>
import Button from "/space/UI/Common/Button.vue";
import DirectInputEntry from "../Common/DirectInputEntry.vue";
</script>


<template>
    <div Content>
        <div EntryGroup>
            <div IdCard ref="IdCard">
                <div EntryGroup>
                    <DirectInputEntry
                        :validate="(val) => val.trim().length >= 2"
                        :value="name"
                        property="name"
                        @update="(val) => (name = val)"
                    >
                        <span en-US>Name</span>
                        <span zh-CN>姓名</span>
                    </DirectInputEntry>
                    <DirectInputEntry
                        :validate="(val) => true"
                        :value="mail"
                        property="email"
                        @update="(val) => (mail = val)"
                    >
                        <span en-US>Mail</span>
                        <span zh-CN>邮箱</span>
                    </DirectInputEntry>
                    <DirectInputEntry
                        :validate="() => true"
                        :value="cell"
                        property="tel"
                        @update="(val) => (cell = val)"
                    >
                        <span en-US>phone</span>
                        <span zh-CN>电话</span>
                    </DirectInputEntry>
                </div>
                <div
                    w100
                    h-rule
                    style="
                        display: flex;
                        justify-content: center;
                        --button-margin: 1.2em 0.8em 0 0.8em;
                    "
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
import { locale } from "/util/locale.js";
export default {
    emits: ["forward", "submitToApp"],
    data() {
        return {
            locale,
            name: "",
            mail: "",
            cell: "",
        };
    },
    watch: {
        name(val) {
            console.log(val);
        },
        cell(val) {
            console.log(val);
        },
        mail(val) {
            console.log(val);
        },
    },
    computed: {
        complete() {
            return (
                !!(this.name && this.mail && this.cell) ||
                this.$emit("submitToApp", { name, mail, cell })
            );
        },
    },
};
</script>

<style scoped>
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
    /* color: var(--white); */
}

[EntryGroup] {
    background-color: var(--white-background);
    min-height: 3em;
    overflow: hidden;
}

::v-deep([EntryGroup] > [Entry]) {
    padding: 0.2em var(--padding);
}

::v-deep([Entry]) {
    display: flex;
    margin: -2px 0;
    border-bottom: 1px solid var(--white-background);
}

::v-deep([Entry]:focus),
::v-deep([Entry]:focus-within) {
    background-color: var(--white-background);
}

::v-deep([Entry] > *) {
}

::v-deep([EntryVal]) {
    flex-grow: 1;
    display: block;
}

::v-deep([EntryAction]) {
}

::v-deep([EntryVal] > [title]) {
    padding-top: 0.4em;
    font-size: 0.8em;
    opacity: 0.6;
}

::v-deep(input) {
    padding: 0.6em 0;
    outline: none;
    border: none;
    background-color: transparent !important;
    /* color: var(--white); */
}
</style>
