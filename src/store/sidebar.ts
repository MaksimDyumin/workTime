import { defineStore } from 'pinia'
import { Component } from 'vue'


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