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
  <Transition>
    <div v-if="modalStore.isModalVisible" class="modal-window-container">
      <v-card>
        dfdsfsdf
      </v-card>
    </div>
  </Transition>
</template>


<style scoped>
.modal-window-container {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  /* left: 0;
  right: 0; */
  text-align: center;
  min-width: 50px;
  min-height: 50px;
}
</style>