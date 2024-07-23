<template>
  <div class="dual-timer-container">
    {{ timer }}
    <div class="menu-container">
      <input v-model="timer.time" type="time" class="timer">
      <button @click="startTimer">Начать</button>
      <button v-if="!isTimeStopped" @click="stopTimer">Пауза</button>
      <button v-else @click="runTimer">Продолжить</button>
      <button @click="resetTimer">Сброс</button>
    </div>
    <div class="timers-container">
      <div class="reversed">
        <label>Прошло</label>
        <TimeDisplay :isReversed="true" :timeStore="timer" />
      </div>
      <div class="normal">
        <label>Осталось</label>
        <TimeDisplay :isReversed="false" :timeStore="timer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeDisplay from './TimeDisplay.vue'
import { ref, computed } from 'vue'
import type { Ref, PropType } from 'vue'
import { useTimeStore } from '../store/timer.ts'
import type { Timer, Timers } from '../store/store.types.ts'

const timeStore = useTimeStore()
const isTimeStopped: Ref<boolean> = ref(false)

let timer = computed(()=>{return timeStore.timers[timeStore.indexActiveTimer]}) 

//   const props = defineProps({
//   timer: {
//     type: Object as PropType<Timer>,
//   },
// });

function startTimer() {
  console.log(23213);
  console.log(timer.value);
  
  let [hours, minutes] = timer.value.time.split(':');
  timer.value.dateWhenTimerStart = new Date()
  let dwts = new Date(timer.value.dateWhenTimerStart.getTime())
  dwts.setMinutes(dwts.getMinutes() + Number(minutes))
  dwts.setHours(dwts.getHours() + Number(hours))
  timer.value.targetDate = dwts
  timeStore.startTimer(timeStore.indexActiveTimer)
}

function stopTimer() {
  timeStore.stopTimer(timeStore.indexActiveTimer)
  isTimeStopped.value = true
}
function runTimer() {
  timeStore.calculeteTime(timeStore.indexActiveTimer)
  isTimeStopped.value = false
}
function resetTimer() {
  timeStore.clearTimer(timeStore.indexActiveTimer)
}

</script>

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