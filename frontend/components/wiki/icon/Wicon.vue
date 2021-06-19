<template>
  <b-icon :icon="icon" :size="iconsize" />
</template>

<style></style>

<script>
import lerp from "../../../utils/lerp";

export default {
  data() {
    return {};
  },
  props: {
    size: {
      type: String,
      default: "small",
    },
    icon: {
      type: String,
      default: "home",
    },
  },
  computed: {
    iconsize: function () {
      const Lerp = new lerp();
      return Lerp.buefySizeSwitch(this.size);
    },
  },
};
</script>
