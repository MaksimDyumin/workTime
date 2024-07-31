

<script setup lang="ts">
import { useModalStore } from '@/store/modal';
import { useTimeStore } from '@/store/timer';
import { ref } from 'vue';

const timerStore = useTimeStore()
const modalStore = useModalStore()
const deltaTimeValue = ref('')
// const timer = timerStore.timers[timerStore.sidebarManagingTimer]

function applyChanges() {
    const [hours, minutes] = deltaTimeValue.value.split(':').map((time)=>{
        return parseInt(time)
    })
    if (!hours && !minutes) {
        return
    }
    const targetDate = timerStore.getActiveTimer.targetDate
    targetDate.setMinutes(targetDate.getMinutes() - minutes)
    targetDate.setHours(targetDate.getHours() - hours)
    modalStore.hideModal()
}
</script>

<template>
  <div class="item-component">
    <input v-model="deltaTimeValue" type="time" class="timer">
    <v-button @click="applyChanges">Подтвердить добавление</v-button>
    <!-- <v-button class="remove-button" @click="removeTimer">Удалить</v-button> -->
  </div>
</template>

<style scoped>
.item-component {
  display: flex;
  gap: 10px;
  align-items: center;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004085;
} */

.remove-button{
  background-color: rgb(232, 0, 0);
}
.remove-button:hover{
  background-color: rgb(185, 0, 0);
}
</style>