import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({}),

  getters: {
  },

  actions: {
    play() {
      var audio = new Audio('1.mp3');
      audio.play();
    }
  }

})