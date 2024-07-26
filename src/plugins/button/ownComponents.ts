import ButtonComp from "./ButtonComp.vue"
import CardComp from "./CardComp.vue"

export function useOwnComponents(app: any): void {
  app
  .component('v-button', ButtonComp)
  .component('v-card', CardComp)
}