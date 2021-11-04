

<template>
  <div Entry
       v-if="Array.isArray(val) ? !!val.length : !!val">
    <div EntryVal>
      <div title>
        <span en-US>{{ formData[attr]["en-US"]}}</span>
        <span zh-CN>{{ formData[attr]["zh-CN"]}}</span>
      </div>
      <div style="font-size: 1em; color: var(--gray-dark)">
        {{
					Array.isArray(val)
						? val.map((item) => intl({'en-US':directionmap[item],'zh-CN':directionMap[item]})).join(",")
						:typeof(val)=='string' ?val:val.name
				}}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { intl } from '/util/env.js'
import { formData } from '/apply/formData.json'
export default {
  props: ['attr', 'val'],
  data() {
    return {
      formData,
      directionMap: {
        architectureDesign: '体系结构设计',
        rtl: 'RTL开发和验证',
        soc: 'SoC集成和验证',
        ic: 'IC后端设计',
      },
      directionmap: {
        architectureDesign: 'System architecture design',
        rtl: 'RTL Development & Verification',
        soc: 'SOC Integration & Verification',
        ic: 'IC Backend design',
      },
    }
  },
  methods: {
    intl,
  },
}
</script>
