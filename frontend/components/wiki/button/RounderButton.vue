<template>
  <Button
    @click="$emit('click')"
    :type="typeWrapper"
    :disabled="disabled"
    :inverted="inverted"
    :rounded="rounded"
    :expanded="expanded"
    :loading="loading"
    :outlined="outlined"
    :size="sizeWrapper"
    :icon-left="iconLeft"
    :icon-right="iconRight"
    :icon-pack="'fad'"
    :class="{ rightrounding: !roundleft, leftrounding: roundleft }"
  >
    <slot></slot>
  </Button>
</template>

<script>
import lerp from "../../../utils/lerp";
export default {
  name: "RounderButton",
  props: {
    roundleft: Boolean,
    size: String, // sm, md, bg, ...
    disabled: Boolean,
    inverted: Boolean,
    rounded: Boolean,
    expanded: Boolean,
    loading: Boolean,
    outlined: Boolean,
    iconLeft: String,
    iconRight: String,
    type: String, // pri, light, dark
  },
  computed: {
    sizeWrapper: function () {
      const Lerp = new lerp();
      return Lerp.buefySizeSwitch(this.size);
    },
    typeWrapper: function () {
      const Lerp = new lerp();
      return Lerp.buefyTypeSwitch(this.size);
    },
  },
};
</script>
<style lang="scss" scoped>
.rightrounding {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.leftrounding {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
