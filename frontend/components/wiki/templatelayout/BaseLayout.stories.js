import BaseLayout from "./BaseLayout.vue"

export default {
  title: "layouts",
  component: BaseLayout,
}

export const Baselayout = () => ({
  components: { BaseLayout },
  template: "<BaseLayout></BaseLayout>"
})