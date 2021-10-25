<script setup>
import RadioCard from "../Common/RadioCard.vue";
</script>

<template>
    <div Content>
        <div EntryGroup>
            <div Form ref="IdCard">
                <h3>请选择您的身份</h3>
                <RadioCard
                    :class="identity === 'student' ? 'selected' : 'unselected'"
                    @click="identity = 'student'"
                >
                    <template #title>
                        <span en-US>student</span>
                        <span zh-CN>学生</span>
                    </template>
                    <template #content>
                        参与⼀⽣⼀芯项⽬各阶段的学习，获取⼀⽣⼀芯助教团队的帮助，通过项⽬组的审核即可获得流⽚机会
                    </template>
                </RadioCard>
                <RadioCard
                    :class="identity === 'ta' ? 'selected' : 'unselected'"
                    @click="identity = 'ta'"
                >
                    <template #title>
                        <span en-US>teaching assistant</span>
                        <span zh-CN>助教</span>
                    </template>
                    <template #content>
                        解答学⽣的问题，对学⽣的代码进⾏审阅和指导，并参与⼀⽣⼀芯各个模块的教案设计和课件制作
                    </template>
                </RadioCard>
                <RadioCard
                    :class="identity === 'teacher' ? 'selected' : 'unselected'"
                    @click="identity = 'teacher'"
                >
                    <template #title>
                        <span en-US>teacher</span>
                        <span zh-CN>老师</span>
                    </template>
                    <template #content>
                        获取项⽬的最新资料，与我们的团队进⾏沟通和协作
                    </template>
                </RadioCard>
            </div>
        </div>
    </div>
</template>
<script>
import { locale } from "/util/locale.js";
export default {
    emits: ["update"],
    data() {
        return {
            locale,
            identity: "",
        };
    },
    watch: {
        identity(val) {
            this.$emit("update", "identity", val);
        },
    }
};
</script>

<style scoped>
[inspector-list] {
    display: flex;
    flex-direction: column;
    border-radius: 0.3em;
    margin-top: 0.2em;
    margin-bottom: 1em;
    background-color: var(--gray-background);
    color: var(--gray-bright);
    font-size: 0.9em;
}

::v-deep(.selected) {
    border-color: var(--accent);
}

::v-deep(.unselected) {
    border-color: var(--gray-brighter);
    opacity: 0.5;
}
</style>
