<script setup lang="ts">
import { useTimeStore } from '../store/timer.ts'
import { computed } from 'vue'
import type { Timer } from '../store/store.types.ts';
import type { ComputedRef } from 'vue';

const timeStore = useTimeStore()
const props = defineProps({
  isReversed: Boolean,
});
const timer: ComputedRef<Timer> = computed(() => {
  return timeStore.getActiveTimer
}) 

const time = computed(() => {
  if (props.isReversed) {
    let [hours, minutes] = timer.value.time.split(':');

    let summSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60
    let summStoreSeconds = timer.value.timeBuffer.hours * 3600 + timer.value.timeBuffer.minutes * 60 + timer.value.timeBuffer.seconds
    let result = summSeconds - summStoreSeconds

    let reversedHours = parseInt(String(result / 3600))
    let reversedMinutes = parseInt(String(parseInt(String(result % 3600)) / 60))
    let reversedSeconds = parseInt(String(result % 3600)) % 60
    
    return `${reversedHours}:${reversedMinutes}:${reversedSeconds}`
  }

  return `${timer.value.timeBuffer.hours}:${timer.value.timeBuffer.minutes}:${timer.value.timeBuffer.seconds}`
})

</script>

<template>
  <div class="timer-container">
    <span class="time">
       {{ time }}
    </span>
  </div>
</template>

<style scoped>
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

.hours, .minutes, .seconds {
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