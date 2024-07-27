import { defineStore } from 'pinia'

interface State {
  backgroundAudio: null | any,
  isBackgroundPlaying: boolean
}

export const useAudioStore = defineStore('audio', {
  state: (): State => ({
    backgroundAudio: '',
    isBackgroundPlaying: false
  }),

  getters: {
  },

  actions: {
    play() {
      const audio = new Audio('1.mp3');
      audio.play();
    },
    playBackgroundAudio() {
      if (!this.isBackgroundPlaying) {
        const audio = new Audio('1.mp3');
        audio.loop = true;
        audio.volume = 0
        audio.play();
        this.backgroundAudio = audio
        this.isBackgroundPlaying = true
      }
    }
  }

})