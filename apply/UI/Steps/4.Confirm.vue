<script setup>
import ConfirmCard from '../Common/ConfirmCard.vue'
defineProps({
  formData: Object,
})
</script>

<template>
  <div Content
       @scroll="e => this.$emit('scroll', e)">
    <div EntryGroup>
      <div Form
           ref="IdCard">
        <div EntryGroup>
          <h4 Entry>
            {{
					intl({
							"en-US": "Please check your application information",
							"zh-CN": "请核对您的申请信息",
						})
					}}
          </h4>
          <ConfirmCard v-for="(val,attr) in formData"
                       :val="val"
                       :attr="attr"
                       :key="attr">
          </ConfirmCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { intl } from '/util/env.js'
// import { formData } from "/apply/formData.json";
export default {
	data(){
		return{
			// formData: {...formData},
		}
	},
  computed: {},
  methods: {
    intl,
  },
}
</script>
