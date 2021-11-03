<script setup>
import Button from '/components/Button.vue'
import DirectInputEntry from '../Common/DirectInputEntry.vue'
defineProps({
  formData: Object,
  renderData: Object,
})
</script>

<template>
  <div Content
       @scroll="(e) => this.$emit('scroll', e)">
    <div EntryGroup>
      <DirectInputEntry :validate="(val) => val.trim().length >= 2"
                        property="name"
                        @update="(val) => this.$emit('update', 'name', val)" />
      <DirectInputEntry :validate="
                    (val) =>
                        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(
                            val
                        )
                "
                        property="mail"
                        @update="(val) => this.$emit('update', 'mail', val)" />
      <span entry
            v-if="renderData.mailLoading">...</span>
      <span entry
            v-else-if="formData.mail !== '' && !renderData.mailValid"
            class="red"
            style="margin-top: -1em; font-size: 0.8em">
        {{formData.mail ? intl({"en-US":"Mailbox already exists","zh-CN":"邮箱已存在"}) : intl({"en-US":"Mailbox format error","zh-CN":"邮箱格式错误"})}}
      </span>
      <DirectInputEntry :validate="(val) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)"
                        property="tel"
                        @update="(val) => this.$emit('update', 'cell', val)"/>
      <span entry
            v-if="renderData.cellLoading">...</span>
      <span entry
            v-else-if="formData.cell !== '' && !renderData.cellValid"
            class="red"
            style="margin-top: -1em; font-size: 0.8em">
        {{ formData.cell ? intl({"en-US":"Phone already exists","zh-CN":"电话已存在"}) : intl({"en-US":"Phone format error","zh-CN":"电话格式错误"})}}
      </span>
    </div>
  </div>
</template>
<script>
import { intl } from '/util/env.js'
export default {
  emits: ['update', 'scroll'],
  data() {
    return {}
  },
  watch: {
    name(val) {
      console.log(val)
    },
    cell(val) {
      console.log(val)
    },
    mail(val) {
      console.log(val)
    },
  },
  methods: {
    intl,
  },
}
</script>

<style scoped>
</style>
