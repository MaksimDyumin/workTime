<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';
import { onMounted } from 'vue';

const sidebarStore = useSidebarStore()

function switchSidebarVisible() {
    setTimeout(() => {
        sidebarStore.isShown = !sidebarStore.isShown
    }, 50);
}


</script>

<template>
    <div @click="switchSidebarVisible()" class="activatore-container">
    </div>
</template>

<style scoped>
.activatore-container{
    height: 100vh;
    width: 50px;
    background-color: #e7e5e5 !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4) !important;
    cursor: pointer;
}
</style>