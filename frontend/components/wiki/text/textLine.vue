<template>
  <p :style="style">
    <slot></slot>
  </p>
</template>

<script>
import lerp from "../../../utils/lerp";

export default {
  name: "textLine",

  props: {
    weight: {
      // from 0 to 1.0
      type: Number,
      default: 0.4,
    },
    size: {
      // from 0.0 to 1.0
      type: Number,
      default: 0.25,
    },
  },
  computed: {
    style: function () {
      const Lerp = new lerp();
      const fontSize = `${Math.round(Lerp.lerpHypertan(this.size, 10.0, 42.0, 0.7, 0.0))}px`;
      const fontWeight = `${Math.round(Lerp.lerpHypertan(this.weight, 1.0, 9.0, 0.7, 0.0)) * 100}`;
      return { fontSize, fontWeight };
    },
  },
};
</script>

<style scoped lang="scss">
.line-p-inner {
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
}
</style>
