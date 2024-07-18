<script setup lang="ts">
import { useTimeStore } from '../store/timer.ts'
import { ref, computed } from 'vue'


const timeStore = useTimeStore()
const props = defineProps({
  isReversed: Boolean,
});

const time2 = computed(() => {
  if (props.isReversed) {
    let [hours, minutes] = timeStore.time.split(':');

    let summSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60
    let summStoreSeconds = timeStore.timeBuffer.hours * 3600 + timeStore.timeBuffer.minutes * 60 + timeStore.timeBuffer.seconds

    let result = summSeconds - summStoreSeconds

    let reversedHours = parseInt(result / 3600)
    let reversedMinutes = parseInt(parseInt(result % 3600) / 60)
    let reversedSeconds = parseInt(result % 3600) % 60
    return `${reversedHours}:${reversedMinutes}:${reversedSeconds}`
  }

  return `${timeStore.timeBuffer.hours}:${timeStore.timeBuffer.minutes}:${timeStore.timeBuffer.seconds}`

})



</script>

<template>
  <div class="timer-container">
    <span class="time">
       {{ time2 }}
    </span>
  
  </div>
</template>

<style scoped>
.timer-container {}

.time {}

/* .hours{

}
.minutes{

} */
</style>
