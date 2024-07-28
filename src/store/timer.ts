import { defineStore } from 'pinia'
import { useAudioStore } from "./audio";
import { Timer } from './store.types';

interface State {
  timers: Array<Timer>
  indexActiveTimer: number,
  sidebarManagingTimer: number,
}


export const useTimeStore = defineStore('time', {
  state: (): State => ({
    timers: [
      {
        timeBuffer: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        name: 'default',
        dateWhenTimerStart: new Date(),
        targetDate: new Date(),
        intervalId: 0,
        time: '00:00',
        timeWhenStopped: new Date(),
        isTimeStopped: false
      },
    ],
    indexActiveTimer: 0,
    sidebarManagingTimer: 0,

  }),

  getters: {
    getActiveTimer: (state) => state.timers[state.indexActiveTimer],
    // getTimeString: (state: any,) => {

    // },
  },

  actions: {
    getTimeString(index: number) {
      const timeBuffer = this.timers[index].timeBuffer
      return `${timeBuffer.hours}:${timeBuffer.minutes}:${timeBuffer.seconds}`
    },
    getReversedTimeString(index: number) {
      const timer = this.timers[index]

      let [hours, minutes] = timer.time.split(':');

      let summSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60
      let summStoreSeconds = timer.timeBuffer.hours * 3600 + timer.timeBuffer.minutes * 60 + timer.timeBuffer.seconds
      let result = summSeconds - summStoreSeconds

      let reversedHours = parseInt(String(result / 3600))
      let reversedMinutes = parseInt(String(parseInt(String(result % 3600)) / 60))
      let reversedSeconds = parseInt(String(result % 3600)) % 60

      return `${reversedHours}:${reversedMinutes}:${reversedSeconds}`
    },
    startTimer(indexActiveTimer: number) {
      this.calculeteTime(indexActiveTimer)
    },
    stopTimer(indexActiveTimer: number) {
      const timer = this.timers[indexActiveTimer]
      timer.timeWhenStopped = new Date()
      clearInterval(timer.intervalId)
    },
    clearTimer(indexActiveTimer: number) {
      const timer = this.timers[indexActiveTimer]
      clearInterval(timer.intervalId)
      timer.timeBuffer = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    },
    calculeteTime(indexActiveTimer: number) {
      const timer = this.timers[indexActiveTimer]
      const AudioStore = useAudioStore()
      timer.intervalId = setInterval(() => {

        const currentTime = new Date();
        let res = timer.targetDate.getTime() - currentTime.getTime()

        timer.timeBuffer.hours = parseInt(String((res / 1000) / 3600))
        timer.timeBuffer.minutes = parseInt(String(((res / 1000) / 60) - timer.timeBuffer.hours * 60))
        timer.timeBuffer.seconds = parseInt(String((res / 1000) % 60))

        if (res <= 0) {
          clearInterval(timer.intervalId)
          timer.timeBuffer = {
            hours: 0,
            minutes: 0,
            seconds: 0,
          }
          AudioStore.play()
        } 1
      }, 1000)
    }
  },
})