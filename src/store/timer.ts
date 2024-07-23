import { defineStore } from 'pinia'
import { useAudioStore } from "./audio";


export const useTimeStore = defineStore('time', {
  state: () => ({
    timeBuffer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    dateWhenTimerStart: new Date(),
    targetDate: new Date(),
    intervalId: 0,
    time: '00:00'
  }),

  getters: {
    getterstTimeBuffer: (state) => state.timeBuffer,
    getterstTime: (state) => state.time,
  },

  actions: {
    startTimer() {
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
        
        const currentTime = new Date();
        let res = this.targetDate.getTime() - currentTime.getTime()

        this.timeBuffer.hours = parseInt(String((res/1000)/3600))
        this.timeBuffer.minutes = parseInt( String(((res/1000)/60) -  this.timeBuffer.hours * 60))
        this.timeBuffer.seconds = parseInt(String((res/1000)%60))
        
        if (res <= 0) {
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