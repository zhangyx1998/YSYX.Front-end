<script setup>
import Responsive from "/components/Responsive.vue";
import CheckboxCard from "./Common/CheckboxCard.vue";
import Badge from "/components/Badge.vue";
defineProps({
    validate: Function,
    property: String,
});
</script>


<template>
    <div Entry>
        <div EntryVal>
            <div title><slot></slot></div>
            <div class="container" v-if="!alt">
                <input
                    v-model="searchStr"
                    ref="input"
                    :placeholder="property"
                    @focus="focus"
                />
                <div input v-if="true">
                    <Badge
                        type="accent unselected"
                        :name="intl(institution)"
                        style="
                            --badge-margin: 0 0 0 0.6em;
                            font-size: 0.9em;
                            opacity: 0.9;
                        "
                    />
                </div>
                <div dropdown style="max-height: 30vh; overflow-y: scroll">
                    <Responsive
                        v-for="(value, index) in insList"
                        :key="index"
                        class="alter"
                        @click="
                            $emit('update', value.ID);
                            searchStr = intl(value.name);
                        "
                    >
                        <div
                            style="
                                flex-grow: 1;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            "
                        >
                            {{ intl(value.name) }}
                        </div>
                        <div style="font-size: 0.8em; color: var(--gray)">
                            {{ intl(value.ID) }}
                        </div>
                    </Responsive>
                    <CheckboxCard
                        :isSelected="alt"
                        @click="alt = !alt"
                        style="padding: 11px 12px"
                    >
                        <span>没有匹配的选项</span>
                    </CheckboxCard>
                </div>
            </div>
            <div v-else class="container">
                <input
                    type="text"
                    placeholder="请直接输入机构名称"
                    v-model="inputAlt"
                />
                <CheckboxCard
                    :isSelected="alt"
                    @click="alt = !alt"
                    style="padding: 11px 12px"
                >
                    <span>没有匹配的选项</span>
                </CheckboxCard>
            </div>
        </div>
    </div>
</template>

<script>
import { intl } from "/util/env.js";
export default {
    emits: ["update", "update-alt"],
    data() {
        return {
            searchStr: "",
            insList: [],
            warn: "",
            alt: false,
            inputAlt: "",
            institution: {},
        };
    },
    methods: {
        onClick(value) {
            this.institution = value.name;
            this.$emit("update", value.ID);
            this.$forceUpdate();
        },
        alertSomething(msg) {
            alert(msg);
        },
        intl,
    },
    watch: {
        searchStr(value) {
            if (value.length > 0) {
                fetch(`http://api.ysyx.org:8100/institutions/${value}`, {
                    method: "GET",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.insList = data;
                    });
            } else {
                this.insList = [];
            }
        },
        inputAlt(value) {
            if (this.validate(value)) {
                this.$emit("update-alt", value);
            } else {
                this.$emit("update-alt", null);
            }
        },
    },
};
</script>

<style scoped>
.container {
    font-size: 14px;
    border: 1px solid var(--gray-border);
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
}
.alter {
    font-size: 14px;
    border-bottom: 1px solid var(--gray-border);
    box-sizing: border-box;
    padding: 11px 12px;
    display: flex;
}
input {
    font-size: 14px;
    border-bottom: 1px solid var(--gray-border);
    box-sizing: border-box;
    padding: 11px 12px;
}
.container *:last-child {
    border-bottom: none;
}
.container:not(:focus):not(:focus-within) [dropdown] {
    /* display: none; */
}
[dropdown] > * {
    background-color: var(--white-brighter);
}
</style>