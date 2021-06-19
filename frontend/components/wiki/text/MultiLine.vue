<template>
  <p :style="Style">
    <slot></slot>
  </p>
</template>

<script>
import lerp from "../../../utils/lerp";

export default {
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
    gray: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    Style: function () {
      const Lerp = new lerp();
      const fontSize = `${Math.round(Lerp.lerpHypertan(this.size, 10.0, 42.0, 0.7, 0.0))}px`;
      const fontWeight = `${Math.round(Lerp.lerpHypertan(this.weight, 1.0, 9.0, 0.7, 0.0)) * 100}`;
      if (this.gray) {
        return {
          fontSize: fontSize,
          weight: fontWeight,
          color: "rgb(123, 128, 158)",
        };
      }
      return {
        fontSize: fontSize,
        weight: fontWeight,
      };
    },
  },
};
</script>
