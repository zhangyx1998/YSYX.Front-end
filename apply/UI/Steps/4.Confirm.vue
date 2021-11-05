<script setup>
import ConfirmCard from "../Common/ConfirmCard.vue";
defineProps({
    formData: Object,
});
</script>

<template>
    <div Content @scroll="(e) => this.$emit('scroll', e)">
        <div EntryGroup>
            <div Form ref="IdCard">
                <div EntryGroup>
                    <h4 Entry>
                        {{
                            intl({
                                "en-US":
                                    "Please check your application information",
                                "zh-CN": "请核对您的申请信息",
                            })
                        }}
                    </h4>
                    <ConfirmCard
                        v-for="(val, attr) in FormData"
                        :val="val"
                        :attr="attr"
                        :key="attr"
                    >
                    </ConfirmCard>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
import { intl } from "/util/env.js";
export default {
    methods: {
        intl,
    },
    computed: {
        FormData() {
            let {
                name,
                cell,
                mail,
                identity,
                institution,
                direction,
                faculty,
                title,
                major,
                resume,
                remark,
                institutionAltName,
            } = this.formData;
            if (identity === "student") {
                return {
                    name,
                    cell,
                    mail,
                    identity,
                    institution,
                    direction,
                    major,
                    resume,
                    remark,
                    institutionAltName,
                };
            } else if (identity === "teacher") {
                return {
                    name,
                    cell,
                    mail,
                    identity,
                    institution,
                    faculty,
                    title,
                    remark,
                    institutionAltName,
                };
            } else {
                return {
                    name,
                    cell,
                    mail,
                    identity,
                    institution,
                    major,
                    resume,
                    remark,
                    institutionAltName,
                };
            }
        },
    },
};
</script>
