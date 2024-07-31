<template>
  <div class="switch-container">
    <transition-group name="timerCard" mode="out-in">
      <div
        v-for="(timer, index) in timeStore.timers"
        :key="timer.id"
        :draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragover.prevent
        @drop="onDrop(index)"
        @click="switchTimer(index)"
        :class="`timer-swicher ${index === timeStore.indexActiveTimer ? 'active' : ''}`"
      >
        <v-card :class="`card-in-sidebar ${index === timeStore.indexActiveTimer ? 'active-card' : ''}`">
          <h3>{{ timer.name }}</h3>
          <div class="abvgd">
            <div class="info-container">
              <span><b style="margin-right: 6px;">Прошло:</b> {{ timeStore.getReversedTimeString(index) }}</span>
              <span><b style="margin-right: 6px;">Осталось:</b> {{ timeStore.getTimeString(index) }}</span>
            </div>
            <div class="action-container">
              <v-button @click="configurateTimer(index, $event)">Настроить таймер</v-button>
            </div>
          </div>
        </v-card>
      </div>
    </transition-group>
    <v-button class="new-timer-button" @click="addNewTimer()">Новый таймер</v-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useModalStore } from '@/store/modal';
import { useTimeStore } from '@/store/timer.ts'
import ManageTimer from '../modals/ManageTimer.vue';
import { useIdStore } from '@/store/ids';
import { Timer } from '@/store/store.types';

const timeStore = useTimeStore()
const modalStore = useModalStore()
const idStore = useIdStore()
const draggedIndex = ref<number | null>(null);

function addNewTimer() {
  timeStore.timers.push(
    {
      id: idStore.generateId(),
      timeBuffer: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      name: 'Новый таймер',
      dateWhenTimerStart: new Date(),
      targetDate: new Date(),
      intervalId: 0,
      time: '00:00',
      timeWhenStopped: new Date(),
      isTimeStopped: false,
      isSessionStarted: false,
    },
  )
}

function switchTimer(index: number) {
  timeStore.indexActiveTimer = index
}

function configurateTimer(index: number, e: Event) {
  e.stopPropagation();
  timeStore.sidebarManagingTimer = index
  modalStore.component = ManageTimer
  modalStore.isModalVisible = true
}

function onDragStart(index: number, e: DragEvent) {
  draggedIndex.value = index;
}

function onDrop(index: number) {
  if (draggedIndex.value === null) return;

  const draggedItem = timeStore.timers[draggedIndex.value];
  
  timeStore.timers.splice(draggedIndex.value, 1);
  timeStore.timers.splice(index, 0, draggedItem);
  if (draggedIndex.value < timeStore.indexActiveTimer && index > timeStore.indexActiveTimer && draggedIndex.value - index !== 1) {
    setTimeout(() => {
      timeStore.indexActiveTimer = timeStore.indexActiveTimer - 1
    },0);
  }
  if (draggedIndex.value > timeStore.indexActiveTimer && index < timeStore.indexActiveTimer) {
    setTimeout(() => {
      timeStore.indexActiveTimer = timeStore.indexActiveTimer + 1
    },);
  }

  if (draggedIndex.value > timeStore.indexActiveTimer && draggedIndex.value - index === 1) {
    // setTimeout(() => {
    //   timeStore.indexActiveTimer = timeStore.indexActiveTimer + 1
    // },);
    console.log('message')
  }

  if (draggedIndex.value === timeStore.indexActiveTimer) {
    setTimeout(()=>{
      timeStore.indexActiveTimer = index
    })
    
  }
  // 1) [1, 2, 3, 4]
  // 2) [ , 2, 3, 4] {1}
  // 3) [2, 1, 3, 4]
  //[1, 2, 3, 4]
  draggedIndex.value = null;
}
</script>

<style scoped>
.switch-container {
  width: 100%;
  transition: all 0.3s;
}

.timer-swicher {
  cursor: pointer;
  transition: all 0.3s;
}

.abvgd {
  display: flex;
  width: 100%;
}

.timer-swicher + .timer-swicher {
  margin-top: 15px;
}

.card-in-sidebar {
  flex-direction: column;
}
.card-in-sidebar h3 {
  margin: 0px;
  margin-bottom: 20px;
  text-align: center;
}

.timer-swicher:hover {
  transform: scale(1.05);
}

.card-in-sidebar {
  background-color: #e7e5e5 !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4) !important;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.card-in-sidebar span {
  text-align: start;
  width: 100%;
}

.action-container {
  width: 62%;
  height: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.new-timer-button {
  margin-top: 20px;
}

.active {
  border: 1px solid;
  border-radius: 5px;
  border-color: gray;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.active-card {
  background-color: #b0aeae !important;
}

.timerCard-enter-active {
  transition: all 0.3s ease-out;
}

.timerCard-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.timerCard-enter-from,
.timerCard-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>