import { defineStore } from 'pinia'
import type { Component } from 'vue';


interface State {
  component: null | Component,
  isModalVisible: boolean
}

export const useModalStore = defineStore('modal', {
  state: (): State => ({
    component: null,
    isModalVisible: false
  }),

  actions: {
    showModal(component: Component) {
      this.component = component
      this.isModalVisible = true
    },
    hideModal() {
      this.component = null
      this.isModalVisible = false
    },
  }

})