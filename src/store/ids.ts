import { defineStore } from 'pinia'

interface State {
  nextId: number,
}

export const useIdStore = defineStore('idStore', {
  state: (): State => ({
    nextId: 0
  }),

  getters: {
  },

  actions: {
    generateId() {
      this.nextId += + 1
      return this.nextId - 1
    }
  }
})