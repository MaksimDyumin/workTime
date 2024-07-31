<script setup lang="ts">
import { useTimeStore } from './store/timer.ts'
import DualTimer from './components/DualTimer.vue'
import SwitchListTimers from '@/components/sidebar/SwitchListTimers.vue'
import Sidebar from '@/components/sidebar/SideBar.vue'
import SidebarActivator from './components/sidebar/SidebarActivator.vue';
import ModalWindow from './components/ModalWindow.vue';
import { LocalstorageTimers } from './store/store.types.ts';
import { useIdStore } from './store/ids.ts';

const timeStore = useTimeStore()
const idStore = useIdStore()

setInterval(()=>{
  localStorage.setItem('timers', JSON.stringify(timeStore.timers))
  localStorage.setItem('nextId', JSON.stringify(idStore.nextId))
}, 10000)

const timersFromLocalstorage = localStorage.getItem('timers')
if (timersFromLocalstorage) {
  const timers: LocalstorageTimers = JSON.parse(timersFromLocalstorage)
  timeStore.timers = timers.map((timer)=>{
    return {
      ...timer,
      dateWhenTimerStart: new Date(timer.dateWhenTimerStart),
      targetDate: new Date(timer.targetDate),
      timeWhenStopped: new Date(timer.timeWhenStopped)
    }
  })
}

const nextId = localStorage.getItem('nextId')
if (nextId !== null) {
  idStore.nextId = parseInt(nextId)
}

window.onbeforeunload = () => {
  localStorage.setItem('timers', JSON.stringify(timeStore.timers))
  localStorage.setItem('nextId', JSON.stringify(idStore.nextId))
}
timeStore.timers.forEach((timer, index)=>{
  if (!timer.isTimeStopped && timer.isSessionStarted) {
    timeStore.calculeteTime(index)
  }
})


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
</style>