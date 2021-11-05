<script setup>
import Badge from "/components/Badge.vue";
</script>

<template>
    <div Entry v-if="!Array.isArray(val) && !!val">
        <div EntryVal>
            <div title style="font-weight: 600; color: var(--accent)">
                <span en-US>{{ formData[attr]["en-US"] }}</span>
                <span zh-CN>{{ formData[attr]["zh-CN"] }}</span>
            </div>
            <div style="font-size: 1em; color: var(--gray-dark)">
                {{
                    Array.isArray(val)
                        ? val
                              .map((item) =>
                                  intl({
                                      "en-US": directionmap[item],
                                      "zh-CN": directionMap[item],
                                  })
                              )
                              .join(",")
                        : typeof val == "string"
                        ? val
                        : val.name
                }}
            </div>
        </div>
    </div>
    <div Entry v-if="Array.isArray(val) && !!val">
        <div EntryVal>
            <div title style="font-weight: 600; color: var(--accent)">
                <span en-US>{{ formData[attr]["en-US"] }}</span>
                <span zh-CN>{{ formData[attr]["zh-CN"] }}</span>
            </div>
            <div style="font-size: 1em; color: var(--gray-dark)">
                <Badge
                    v-for="(value, index) in val"
                    :key="index"
                    type="accent unselected"
                    :name="
                        intl({
                            'en-US': directionmap[value],
                            'zh-CN': directionMap[value],
                        })
                    "
                    style="font-size: 0.9em; opacity: 0.9"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
import { intl } from "/util/env.js";
import { formData } from "/apply/formData.json";
export default {
    props: ["attr", "val"],
    data() {
        return {
            formData,
            directionMap: {
                architectureDesign: "体系结构设计",
                rtl: "RTL开发和验证",
                soc: "SoC集成和验证",
                ic: "IC后端设计",
            },
            directionmap: {
                architectureDesign: "System architecture design",
                rtl: "RTL Development & Verification",
                soc: "SOC Integration & Verification",
                ic: "IC Backend design",
            },
        };
    },
    methods: {
        intl,
    },
};
</script>
