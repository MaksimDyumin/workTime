<script setup lang="ts">
import TimeDisplay from './TimeDisplay.vue'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useTimeStore } from '@/store/timer.ts'
import type { Timer } from '@/store/store.types.ts'
import { useAudioStore } from '@/store/audio.js';
import { useModalStore } from '@/store/modal'
import AddTime from './modals/AddTime.vue'


const timeStore = useTimeStore()

let timer: ComputedRef<Timer> = computed(() => { return timeStore.getActiveTimer })
const activeTimer = computed(() => timeStore.getActiveTimer)
const modalStore = useModalStore()


function startTimer() {
  let [hours, minutes] = timer.value.time.split(':');
  timer.value.dateWhenTimerStart = new Date()
  let dwts = new Date(timer.value.dateWhenTimerStart.getTime())
  dwts.setMinutes(dwts.getMinutes() + Number(minutes))
  dwts.setHours(dwts.getHours() + Number(hours))
  timer.value.targetDate = dwts
  timeStore.startTimer(timeStore.indexActiveTimer)

  activeTimer.value.isSessionStarted = true
  const audioStore = useAudioStore()
  audioStore.playBackgroundAudio()
}
function stopTimer() {
  timeStore.stopTimer(timeStore.indexActiveTimer)
  activeTimer.value.isTimeStopped = true
}
function runTimer() {
  const timer = timeStore.getActiveTimer
  timer.targetDate = new Date(timer.targetDate.getTime() + (new Date().getTime() - timer.timeWhenStopped.getTime()))

  timeStore.calculeteTime(timeStore.indexActiveTimer)
  activeTimer.value.isTimeStopped = false
}
function resetTimer() {
  timeStore.clearTimer(timeStore.indexActiveTimer)
  activeTimer.value.isTimeStopped = false
  activeTimer.value.isSessionStarted = false
}

function showAddTimeModal() {
  modalStore.showModal(AddTime)
}
</script>


<template>
  <div v-if="timer" class="dual-timer-container">
    <div class="menu-container">
      <input v-model="timer.time" type="time" class="timer">
      <v-button v-if="!activeTimer.isSessionStarted" @click="startTimer">Начать</v-button>
      <div v-else class="">
        <v-button v-if="!activeTimer.isTimeStopped" @click="stopTimer">Пауза</v-button>
        <v-button v-else @click="runTimer">Продолжить</v-button>
      </div>
      <v-button @click="resetTimer">Сброс</v-button>
      <v-button @click="showAddTimeModal">+ время</v-button>
    </div>
    <div class="timers-container">
      <div class="reversed">
        <label>Прошло</label>
        <TimeDisplay :isReversed="true" :timer="timer" />
      </div>
      <div class="normal">
        <label>Осталось</label>
        <TimeDisplay :isReversed="false" :timer="timer" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.menu-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.menu-container button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-container button:hover {
  background-color: #0056b3;
}

.menu-container button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.menu-container button+button {
  margin-left: 10px;
}

.timer {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.timers-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.reversed,
.normal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.normal {
  margin-left: 10px;
}

label {
  font-size: 1rem;
  color: #495057;
  margin-bottom: 10px;
}
</style>