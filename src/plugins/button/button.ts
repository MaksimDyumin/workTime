import { defineCustomElement } from "vue";
// import Button from './Button.vue'

const MyVueElement = defineCustomElement({
  // обычные опции компонента Vue
  props: {},
  emits: {},
  template: `<button><slot /></button>`,

  // только для defineCustomElement: CSS, внедряемый в shadow root
  styles: [`/* inlined css */`]
})

export default () => customElements.define('v-button', MyVueElement)