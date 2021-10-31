<script setup>
import Responsive from "/components/Responsive.vue";
defineProps({
    isSelected: Boolean,
});
</script>

<template>
    <div>
        <Responsive class="container">
            <i
                class="fas fa-check-square"
                v-if="isSelected"
                style="color: var(--accent-selected)"
            ></i>
            <i class="far fa-square" v-else></i>
            <div class="name-container">
                <span><slot></slot></span>
            </div>
        </Responsive>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
span {
    font-size: 0.8em;
}
i {
    margin-right: 0.3em;
    color: var(--gray-dark);
}
</style>