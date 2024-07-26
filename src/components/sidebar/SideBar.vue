<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';
import { ref } from 'vue';

const sidebarStore = useSidebarStore()

</script>

<template>
  <Transition mode="out-in">
    <div v-if="sidebarStore.isShown" class="sidebar-container">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.sidebar-container {
  position: absolute;
  left: 0;
  width: 450px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: auto;
  z-index: 2;
  margin-left: 50px;
  transition: all 0.2s ease-in-out; 
}

.v-enter-active,
.v-leave-active {
  margin-left: 50px;
}

.v-enter-from,
.v-leave-to {
  margin-left: -500px;
}
</style>