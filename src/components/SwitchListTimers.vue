<script setup lang="ts">
import { useTimeStore } from '../store/timer.ts'
import { computed } from 'vue'

const timeStore = useTimeStore()

function addNewTimer() {
  timeStore.timers.push(
    {
      timeBuffer: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      dateWhenTimerStart: new Date(),
      targetDate: new Date(),
      intervalId: 0,
      time: '00:00'
    },
  )
}

function switchTimer(index: number) {
  timeStore.indexActiveTimer = index
  console.log(timeStore.indexActiveTimer);

}

</script>

<template>
  <div class="switch-container">
    <div @click="switchTimer(index)" class="timer-swicher" v-for="timer, index in timeStore.timers">
      {{ index }}
      {{ timer }}
    </div>
    <button @click="addNewTimer()">Новый таймер</button>
  </div>
</template>

<style scoped>
.timer-swicher {
  border: 1px solid black;
}

button {
  background-color: #0000ff;
}

.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  margin: 0 auto;
}

.time {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
  color: #333;
}

.hours,
.minutes,
.seconds {
  display: inline-block;
  padding: 0 5px;
}

/* Example of individual styles for hours, minutes, and seconds */
.hours {
  color: #ff0000;
}

.minutes {
  color: #00ff00;
}

.seconds {
  color: #0000ff;
}
</style>