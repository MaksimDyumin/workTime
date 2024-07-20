import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TimerId } from './store.types'
import { useAudioStore } from "./audio";



export const useTimeStore = defineStore('time', {
  state: () => ({
    timeBuffer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    intervalId: 0,
    time: '00:00'
  }),

  getters: {
    getterstTimeBuffer: (state) => state.timeBuffer,
    getterstTime: (state) => state.time,
  },

  actions: {
    startTimer(hours: number, minutes: number) {
      this.timeBuffer.hours = hours
      this.timeBuffer.minutes = minutes
      this.timeBuffer.seconds = 0
      this.calculeteTime()
    },
    stopTimer() {
      clearInterval(this.intervalId)
    },
    clearTimer() {
      clearInterval(this.intervalId)
      this.timeBuffer = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    },
    calculeteTime() {
      const AudioStore = useAudioStore()
      this.intervalId = setInterval(() => {
        if (this.timeBuffer.minutes === 0 && this.timeBuffer.seconds === 0) {
          this.timeBuffer.hours -= 1
          this.timeBuffer.minutes = 59
          this.timeBuffer.seconds = 60
        } else if (this.timeBuffer.seconds === 0) {
          this.timeBuffer.minutes -= 1
          this.timeBuffer.seconds = 60
        }

        this.timeBuffer.seconds -= 1

        if (this.timeBuffer.hours < 0) {
          clearInterval(this.intervalId)
          this.timeBuffer = {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }
          AudioStore.play()
        }
      }, 1000)
    }
  },
})