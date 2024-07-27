<script setup lang="ts">
import TimeDisplay from './TimeDisplay.vue'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useTimeStore } from '@/store/timer.ts'
import type { Timer, Timers } from '@/store/store.types.ts'
import { useModalStore } from '@/store/modal'


const modalStore = useModalStore()

</script>


<template>
  <Transition name="manageTimer">
    <div v-if="modalStore.isModalVisible" class="modal-window-container">
      <div @click="modalStore.hideModal()" class="modal-layaut"></div>
      <v-card class="modal-card">
        <component :is="modalStore.component"></component>
      </v-card>
    </div>
  </Transition>
</template>


<style scoped>
.modal-window-container {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  min-width: 50px;
  min-height: 50px;
  transition: all 0.3s ease;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-layaut {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top:0;
  left: 0;
  background: #000;
  opacity: 0.6;
}

.modal-card{
  z-index: 5;
}

.manageTimer-enter-active,
.manageTimer-leave-active {
  opacity: 1;
}

.manageTimer-enter-from,
.manageTimer-leave-to {
  opacity: 0;
}
</style>