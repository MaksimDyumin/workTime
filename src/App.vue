<script setup lang="ts">
import TimeDisplay from './components/TimeDisplay.vue'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import {useTimeStore} from './store/timer.ts'

const timeStore = useTimeStore()
let intervalId: any = null

const isTimeStopped = ref(false)

function startTimer() {

  let [hours, minutes] = timeStore.time.split(':');
  console.log(timeStore.timeBuffer)
  timeStore.timeBuffer.hours = parseInt(hours)
  timeStore.timeBuffer.minutes = parseInt(minutes)
  timeStore.timeBuffer.seconds = 0

  clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (timeStore.timeBuffer.minutes === 0 && timeStore.timeBuffer.seconds === 0) {
      timeStore.timeBuffer.hours -= 1
      timeStore.timeBuffer.minutes = 59
      timeStore.timeBuffer.seconds = 60
    } else if (timeStore.timeBuffer.seconds === 0) {
      timeStore.timeBuffer.minutes -= 1
      timeStore.timeBuffer.seconds = 60
    }
    timeStore.timeBuffer.seconds -= 1
  }, 1000)
}
function stopTimer() {
  clearInterval(intervalId)
  isTimeStopped.value = true
}
function runTimer() {
  intervalId = setInterval(() => {
    if (timeStore.timeBuffer.minutes === 0 && timeStore.timeBuffer.seconds === 0) {
      timeStore.timeBuffer.hours -= 1
      timeStore.timeBuffer.minutes = 59
      timeStore.timeBuffer.seconds = 60
    } else if (timeStore.timeBuffer.seconds === 0) {
      timeStore.timeBuffer.minutes -= 1
      timeStore.timeBuffer.seconds = 60
    }
    timeStore.timeBuffer.seconds -= 1
  }, 1000)
  isTimeStopped.value = false
}
function resetTimer() {
  
}

</script>

<template>
  <div class="main-container">
    <div class="menu-container">
      <input v-model="timeStore.time" type="time" class="timer">
      <button @click="startTimer">Начать</button>
      <button v-if="!isTimeStopped" @click="stopTimer">Пауза</button>
      <button v-else @click="runTimer">Продолжить</button>
      <button @click="resetTimer">Сброс</button>
    </div>
    <div class="timers-container">
      <TimeDisplay :isReversed="true" />
      <TimeDisplay :isReversed="false" />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.menu-container {
  display: flex;
}

.menu-container button+button {
  margin-left: 10px;
}

.timer {
  margin-right: 10px;
}

.timers-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 20px;
}
</style>
