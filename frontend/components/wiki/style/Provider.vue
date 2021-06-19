<template>
  <div :class="{ block: this.isBlock }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Styleprovider",
  props: {
    type: {
      type: String,
      default: "is-primary",
    },
    size: {
      type: String,
      default: "is-default",
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      type: this.type,
      size: this.size,
    };
  },
};
</script>
<style lang="scss" scoped></style>
