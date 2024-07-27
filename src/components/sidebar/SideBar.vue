<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';
import { onMounted, Ref, ref } from 'vue';

const sidebarStore = useSidebarStore()
const sidebarHtmlElement: Ref<null | HTMLElement> = ref(null)

onMounted(()=> {
  sidebarStore.element = sidebarHtmlElement.value
})
</script>

<template>
  <Transition name="sidebar" ref="sidebarHtmlElement" mode="out-in">
    <div v-show="sidebarStore.isShown" class="sidebar-container">
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
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
  margin-left: 50px;
  transition: all 0.2s ease-in-out;
}

.sidebar-enter-active,
.sidebar-leave-active {
  margin-left: 50px;
}

.sidebar-enter-from,
.sidebar-leave-to {
  margin-left: -500px;
}
</style>