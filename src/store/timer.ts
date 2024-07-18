import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTimeStore = defineStore('time', {
  state: () => ({
    timeBuffer:{
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    time: '00:00'
  }),

  getters: {
    getterstTimeBuffer: (state) => state.timeBuffer,
    getterstTime: (state) => state.time,
  },

  // actions: {
  //   changeTimeStandart(newValue: Date) {
  //     this.timeStandart = newValue
  //   },
  //   changetTimeRevers(newValue: Date) {
  //     this.timeRevers = newValue
  //   }
  // },
})