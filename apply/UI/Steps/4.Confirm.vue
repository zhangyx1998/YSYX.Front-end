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
					<h4 Entry>
						请核对您的申请信息
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
	computed: {},
};
</script>
