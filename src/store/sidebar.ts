import { defineStore } from 'pinia'


interface State {
  isShown: boolean,
  element: null | HTMLElement,
}


export const useSidebarStore = defineStore('sidebar', {
  state: (): State => ({
    isShown: false,
    element: null,
  }),

  getters: {
  },

  actions: {
  }

})