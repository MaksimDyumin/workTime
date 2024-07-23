<script setup lang="ts">
import TimeDisplay from './components/TimeDisplay.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useTimeStore } from './store/timer.ts'
import DualTimer from './components/DualTimer.vue'
import SwitchListTimers from './components/SwitchListTimers.vue'

const timeStore = useTimeStore()


</script>

<template>
  <div class="main-container">
    <SwitchListTimers />
    <DualTimer :timer="timeStore.timers[0]"/>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

</style>