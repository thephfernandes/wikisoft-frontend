<template>
  <h1 :style="style" v-if="_semantic === 1">
    <slot></slot>
  </h1>
  <h2 :style="style" v-else-if="_semantic === 2">
    <slot></slot>
  </h2>
  <h3 :style="style" v-else-if="_semantic === 3">
    <slot></slot>
  </h3>
  <h4 :style="style" v-else-if="_semantic === 4">
    <slot></slot>
  </h4>
  <h5 :style="style" v-else-if="_semantic === 5">
    <slot></slot>
  </h5>
  <h6 :style="style" v-else-if="_semantic === 6">
    <slot></slot>
  </h6>
  <div :style="style" v-else-if="_semantic === 7">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    semantic: {
      type: Number,
    },
    size: {
      type: Number,
    },
    gray: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _semantic: function () {
      return this.semantic;
    },
    // we are never going out of...
    style: function () {
      let result = {};
      switch (this.size) {
        case 1:
          result = {
            fontSize: "14px",
            fontWeight: 500,
          };
          break;
        case 2:
          result = {
            fontSize: "16px",
            fontWeight: 500,
          };
          break;
        case 3:
          result = {
            fontSize: "20px",
            fontWeight: 600,
          };
          break;
        case 4:
          result = {
            fontSize: "28px",
            fontWeight: 600,
          };
          break;
        case 5:
          result = {
            fontSize: "36px",
            fontWeight: 700,
          };
          break;
        case 6:
          result = {
            fontSize: "46px",
            fontWeight: 700,
          };
          break;
        default:
          result = {
            fontSize: "14px",
            fontWeight: 500,
          };
      }
      if (this.gray) {
        result.color = "rgb(123, 128, 158)";
      }
      return result;
    },
  },
};
</script>
