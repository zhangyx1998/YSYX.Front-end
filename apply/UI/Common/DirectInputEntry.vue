<script setup>
import Button from "/components/Button.vue";
import Responsive from "/components/Responsive.vue";
defineProps({
    validate: Function,
    property: String,
    autocomplete: String,
});
</script>

<template>
    <div Entry>
        <div EntryVal>
            <div title>
                {{ intl(formData[property]) }}
            </div>
            <input
                ref="input"
                :autocomplete="autocomplete"
                :placeholder="warn || intl(formData[property])"
                @keydown.enter="update"
                @blur="update"
                @input="update(true)"
            />
        </div>
    </div>
</template>

<script>
import { formData } from "/apply/formData.json";
import { intl } from "/util/env.js";
export default {
    emits: ["update"],
    data() {
        return {
            formData,
            focus: false,
            editing: false,
            warn: "",
        };
    },
    watch: {
        focus(focused) {
            if (focused) this.editing = true;
        },
    },
    methods: {
        update(input = false) {
            if (!input) {
                this.$refs.input.blur();
            }
            if (this.validate(this.$refs.input.value))
                this.$emit("update", this.$refs.input.value);
            else {
                this.warn = "格式错误，请重新输入";
                this.$emit("update", this.$refs.input.value && null);
            }
        },
        intl,
    },
};
</script>

<style scoped>
input:focus {
    border-color: var(--accent-emphasis);
    box-shadow: 0 0 0 3px var(--accent-shadow);
}
</style>
