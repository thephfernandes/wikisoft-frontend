import Header from "./Header.vue"

export default {
  title: "Html_wrappers",
  component: Header,
}

export const _Header = (args, { argTypes }) => ({
  components: { Header },
  props: Object.keys(argTypes),
  template: '<Header v-bind="$props" v-on="$props">Test</Header>',
})
_Header.argTypes = {
  semantic: {
    control: {
      type: 'number',
    },
  },
  size: {
    control: {
      type: 'number'
    }
  }
}
_Header.args = {
  semantic: 6,
  size: 6,
}