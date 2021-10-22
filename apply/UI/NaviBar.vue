<script setup>
import Responsive from "/space/UI/Common/Responsive.vue";
defineProps({
    display: String,
    step: Number,
});
</script>

<template>
    <div NaviBar>
        <Responsive
            v-for="(el, ID) in entries"
            :key="ID"
            @click="el.changeStep()"
            :class="active(ID)"
        >
            <i :class="el.icon[active(ID)]"></i>
            <span>{{ el.name[locale.$] }}</span>
        </Responsive>
    </div>
</template>

<script>
import { locale } from "/util/locale.js";

export default {
    emits: ["switch", "slide-to", "forward", "back"],
    data() {
        return {
            locale,
            order: null,
            allEntries: {
                lastStep: {
                    icon: {
                        active: "fas fa-arrow-left",
                        inactive: "fas fa-arrow-left",
                    },
                    name: {
                        "en-US": "Last Step",
                        "zh-CN": "上一步",
                    },
                    changeStep:() => {
                        this.$emit("back");
                    },
                },
                nextStep: {
                    icon: {
                        active: "fas fa-arrow-right",
                        inactive: "fas fa-arrow-right",
                    },
                    name: {
                        "en-US": "Next Step",
                        "zh-CN": "下一步",
                    },
                    changeStep:() => {
                        console.log(this);
                        this.$emit("forward");
                    },
                },
            },
        };
    },
    computed: {
        entries() {
            if ([2, 3].includes(this.step)) {
                return {
                    lastStep: this.allEntries.lastStep,
                    nextStep: this.allEntries.nextStep,
                };
            } else if (this.step === 1) {
                return {
                    nextStep: this.allEntries.nextStep,
                };
            } else {
                return {
                    lastStep: this.allEntries.lastStep,
                };
            }
        },
    },
    methods: {
        active(ID) {
            return ID === this.display ? "active" : "inactive";
        },
        select(val, i) {
            this.order = i;
            if (val !== this.display) this.$emit("switch", val);
        },
    },
    watch: {
        order(newVal, oldVal) {
            if (oldVal !== null && newVal !== oldVal) {
                this.$emit("slide-to", newVal > oldVal ? "left" : "right");
            }
        },
    },
    mounted() {
        this.order = Object.keys(this.entries).indexOf(this.display);
    },
};
</script>


<style scoped>
[NaviBar] {
    /* Positioning */
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--mobile-navibar-height);
    /* Appearance */
    background-color: white;
    border-top: 0.06em solid var(--gray-brighter);
    /* Layout */
    display: flex;
    align-items: center;
    justify-content: space-around;
}

[NaviBar] > * {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 5em;
    font-weight: 400;
    font-size: 0.75em;
    transition: background-color 0.2s ease-out;
    transition-delay: background-color 0.1s;
    padding-bottom: var(--mobile-bottom-safearea);
}

[NaviBar] > *.inactive > * {
    opacity: 0.8;
    color: var(--gray);
}

[NaviBar] > *.active > * {
    opacity: 1;
    color: var(--accent);
}

[NaviBar] i {
    font-size: 1.8em;
    margin-bottom: 0.2em;
}
</style>