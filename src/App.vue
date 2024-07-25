<script setup lang="ts">
import { useTimeStore } from './store/timer.ts'
import DualTimer from './components/DualTimer.vue'
import SwitchListTimers from '@/components/sidebar/SwitchListTimers.vue'
import CardComp from '@/components/CardComp.vue'
import Sidebar from '@/components/sidebar/SideBar.vue'

const timeStore = useTimeStore()


</script>

<template>
  <Sidebar>
    <SwitchListTimers />
  </Sidebar>
  <div class="main-container">
    <CardComp>
      <DualTimer :timer="timeStore.timers[0]" />
    </CardComp>
  </div>
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
</style>