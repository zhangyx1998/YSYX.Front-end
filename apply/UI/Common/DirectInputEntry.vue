<script setup>
import Button from "/components/Button.vue";
import Responsive from "/components/Responsive.vue";
defineProps({
    validate: Function,
    property: String,
});
</script>

<template>
    <div Entry>
        <div EntryVal>
            <div title><slot></slot></div>
            <input
                ref="input"
                :autocomplete="property"
                :placeholder="warn || property"
                @keydown.enter="update()"
                @blur="update()"
            />
        </div>
    </div>
</template>

<script>
export default {
    emits: ["update"],
    data() {
        return {
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
        update() {
            this.$refs.input.blur();
            if (this.validate(this.$refs.input.value))
                this.$emit("update", this.$refs.input.value);
            else {
                this.warn = "格式错误，请重新输入";
                this.$refs.input.value = "";
                this.$emit("update", null);
            }
        },
    },
};
</script>

<style scoped>
input {
    font-size: 14px;
    border: 1px solid var(--gray-border);
    border-radius: 6px;
	box-sizing: border-box;
    padding: 11px 12px;
}
</style>
