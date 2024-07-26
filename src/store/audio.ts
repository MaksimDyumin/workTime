import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({}),

  getters: {
  },

  actions: {
    play() {
      var audio = new Audio('1.mp3');
      audio.play();
      return 'asdads'
    }
  }

})

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   function increment() {
//     count.value++
//   }

//   return { count, increment }
// })