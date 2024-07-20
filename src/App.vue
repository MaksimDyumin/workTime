<script setup lang="ts">
import TimeDisplay from './components/TimeDisplay.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useTimeStore } from './store/timer.ts'
// import { useAudioStore } from './store/audio.ts'

const timeStore = useTimeStore()
const isTimeStopped: Ref<boolean> = ref(false)

function startTimer() {
  let [hours, minutes] = timeStore.time.split(':');
  timeStore.startTimer(parseInt(hours), parseInt(minutes))
}
function stopTimer() {
  timeStore.stopTimer()
  isTimeStopped.value = true
}
function runTimer() {
  timeStore.calculeteTime()
  isTimeStopped.value = false
}
function resetTimer() {
  timeStore.clearTimer()
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
      <div class="reversed">
        <label>Прошло</label>
        <TimeDisplay :isReversed="true" />
      </div>
      <div class="normal">
        <label>Осталось</label>
        <TimeDisplay :isReversed="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

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

.menu-container button + button {
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

.reversed, .normal {
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