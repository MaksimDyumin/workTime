<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';

const sidebarStore = useSidebarStore()
</script>

<template>
    <div @click="sidebarStore.isShown = !sidebarStore.isShown" class="activatore-container">
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