<script setup lang="ts">
import { useTimeStore } from '../store/timer.ts'
import { computed } from 'vue'

// const timeStore = useTimeStore()
const props = defineProps({
  isReversed: Boolean,
  timeStore: Object,
});

const time = computed(() => {
  if (props.isReversed) {
    let [hours, minutes] = props.timeStore.time.split(':');

    let summSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60
    let summStoreSeconds = props.timeStore.timeBuffer.hours * 3600 + props.timeStore.timeBuffer.minutes * 60 + props.timeStore.timeBuffer.seconds

    let result = summSeconds - summStoreSeconds

    let reversedHours = parseInt(String(result / 3600))
    let reversedMinutes = parseInt(String(parseInt(String(result % 3600)) / 60))
    let reversedSeconds = parseInt(String(result % 3600)) % 60
    return `${reversedHours}:${reversedMinutes}:${reversedSeconds}`
  }

  return `${props.timeStore.timeBuffer.hours}:${props.timeStore.timeBuffer.minutes}:${props.timeStore.timeBuffer.seconds}`
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