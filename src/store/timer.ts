import { defineStore } from 'pinia'
import { useAudioStore } from "./audio";
import { ref } from 'vue';
import { Timer } from './store.types';

interface State {
  timers: Array<Timer>
  indexActiveTimer: number
}
interface Getters {
  getActiveTimer: Number
}
type TiFunction = (a: string) => void;


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
        time: '00:00'
      },
    ],
    indexActiveTimer: 0
  }),

  getters: {
    getActiveTimer: (state) => state.timers[state.indexActiveTimer],
    getTimeString: (state: any,) => {
      
    },
  },

  actions: {
    // getTimeString(timerIndex: number) {
    //   const timerBuffer = this.timers[timerIndex].timeBuffer
    //   return `${timerBuffer.hours}:${timerBuffer.minutes}:${timerBuffer.seconds}`
    // },
    // getReverseTimeString(timerIndex: number) {
    //   const timerBuffer = this.timers[timerIndex].timeBuffer
    //   return `${timerBuffer.hours}:${timerBuffer.minutes}:${timerBuffer.seconds}`
    // },
    startTimer(indexActiveTimer: number) {
      this.calculeteTime(indexActiveTimer)
    },
    stopTimer(indexActiveTimer: number) {
      const timer = this.timers[indexActiveTimer]
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
        }1
      }, 1010)
    }
  },
})