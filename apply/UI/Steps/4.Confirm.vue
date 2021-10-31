<script setup>
import ConfirmCard from "../Common/ConfirmCard.vue";
defineProps({
	formData: Object,
});
</script>

<template>
	<div Content>
		<div EntryGroup>
			<div Form ref="IdCard">
				<div EntryGroup>
					<h4 Entry style="color:var(--red-bright)">
						请核对您的个人信息。若无误，点击右下角按钮进行提交！谢谢！
					</h4>
					<ConfirmCard
						v-for="(val, attr) in formData"
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
export default {
	computed: {
		
	},
};
</script>
