<script setup lang="ts">
import { useTimeStore } from '@/store/timer.ts'
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
      name: 'default1',
      dateWhenTimerStart: new Date(),
      targetDate: new Date(),
      intervalId: 0,
      time: '00:00'
    },
  )
}

function switchTimer(index: number) {
  timeStore.indexActiveTimer = index
}

</script>

<template>
  <div class="switch-container">
    <div @click="switchTimer(index)" class="timer-swicher" v-for="timer, index in timeStore.timers">
      <v-card class="card-in-sidebar">
        <div class="info-container">
          <span><b style="margin-right: 6px;">Название:</b> {{ timer.name }}</span>
          <span><b style="margin-right: 6px;">Осталось:</b> {{ timeStore?.getTimeString(index) }}</span>
        </div>
        <div class="action-container">
          <v-button>Настроить кнопку</v-button>
        </div>
      </v-card>
    </div>
    <v-button class="new-timer-button" @click="addNewTimer()">Новый таймер</v-button>
  </div>
</template>

<style scoped>
.switch-container {
  width: 100%;
}

.card-in-sidebar {
  background-color: #e7e5e5 !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4) !important;
  
}
.info-container {
  display: flex;
  flex-direction: column ;
}

.card-in-sidebar span {
  text-align: start;
  width: 100%;
}

.action-container{
  width: 62%;
  height: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.new-timer-button{
  margin-top: 20px;
}
</style>