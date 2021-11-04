<script setup>
import Button from '/components/Button.vue'
import Responsive from '/components/Responsive.vue'
defineProps({
  validate: Function,
  property: String,
})
</script>

<template>
  <div Entry>
    <div EntryVal>
      <div title>
		    <span en-US>{{ formData[property]["en-US"]}}</span>
			<span zh-CN>{{ formData[property]["zh-CN"]}}</span>
      </div>
      <textarea ref="input"
             :autocomplete="property"
             :placeholder="warn || property"
             @keydown.enter="update"
             @blur="update"
             @input="update(true)" />
    </div>
  </div>
</template>

<script>
import { formData } from '/apply/formData.json'
export default {
  emits: ['update'],
  data() {
    return {
      formData,
      focus: false,
      editing: false,
      warn: '',
    }
  },
  watch: {
    focus(focused) {
      if (focused) this.editing = true
    },
  },
  methods: {
    update(input = false) {
      if (!input) {
        this.$refs.input.blur()
      }
      if (this.validate(this.$refs.input.value))
        this.$emit('update', this.$refs.input.value)
      else {
        this.warn = '格式错误，请重新输入'
        this.$emit('update', this.$refs.input.value && null)
      }
    },
  },
}
</script>

<style scoped>
textarea:focus {
  border-color: var(--accent-emphasis);
  box-shadow: 0 0 0 3px var(--accent-shadow);
}
</style>
