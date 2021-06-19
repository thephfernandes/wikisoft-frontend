<template>
  <b-button
    @click="$emit('click')"
    :type="type"
    :disabled="disabled"
    :inverted="inverted"
    :rounded="rounded"
    :expanded="expanded"
    :loading="loading"
    :outlined="outlined"
    :size="size"
    :icon-left="iconLeft"
    :icon-right="iconRight"
    :icon-pack="'fad'"
  >
    <slot> </slot>
  </b-button>
</template>
<script>
import lerp from "../../../utils/lerp";
export default {
  name: "Button",
  // inject: ["size", "type"],
  props: {
    size: {
      default() {
        const Lerp = new lerp();

        return Lerp.buefySizeSwitch(this.size);
      },
    }, // sm, md, bg, ...
    disabled: Boolean,
    inverted: Boolean,
    rounded: Boolean,
    expanded: Boolean,
    loading: Boolean,
    outlined: Boolean,
    iconLeft: String,
    iconRight: String,
    type: {
      default() {
        const Lerp = new lerp();

        return Lerp.buefyTypeSwitch(this.type);
      },
    }, // pri, light, dark
  },
  computed: {
    // sizeWrapper: function () {
    //   try {
    //     const Lerp = new lerp();
    //     return Lerp.buefySizeSwitch(this.size);
    //   } catch (error) {
    //     return "is-default";
    //   }
    // },
    // typeWrapper: function () {
    //   try {
    //     const Lerp = new lerp();
    //     return Lerp.buefyTypeSwitch(this.type);
    //   } catch (error) {
    //     return "is-primary";
    //   }
    // },
  },
};
</script>

.<style lang="scss" scoped>
.button {
  padding: 0.5em 0.7em;
}
</style>
