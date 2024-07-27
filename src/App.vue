<script setup lang="ts">
import { useTimeStore } from './store/timer.ts'
import DualTimer from './components/DualTimer.vue'
import SwitchListTimers from '@/components/sidebar/SwitchListTimers.vue'
import Sidebar from '@/components/sidebar/SideBar.vue'
import SidebarActivator from './components/sidebar/SidebarActivator.vue';
import ModalWindow from './components/ModalWindow.vue';
import { useAudioStore } from '@/store/audio.js';

const timeStore = useTimeStore()
</script>

<template>
  <SidebarActivator></SidebarActivator>
  <Sidebar>
    <SwitchListTimers />
  </Sidebar>
  <div class="main-container">
      <DualTimer :timer="timeStore.timers[0]" />
  </div>
  <ModalWindow />
</template>

<style scoped>
.main-container {
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
}
</style>./plugins/button/ButtonComp.vue/index.ts