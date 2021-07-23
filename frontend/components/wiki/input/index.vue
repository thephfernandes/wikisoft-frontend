<template>
  <b-input
    class="self-input"
    @input="emitUpdate"
    @focus="emitFocus"
    @blur="emitBlur"
    @icon-click="emitIconClick"
    @icon-right-click="emitIconRightClick"
    @submit="emitSubmit"
    :size="computedSize"
    :type="type"
    :expanded="expanded"
    :loading="loading"
    :label="label"
    :has-counter="hasCounter"
    :custom-class="customClass"
    :icon="icon"
    :icon-right="iconRight"
    :validation-message="validationMessage"
    :password-reveal="type === 'password'"
    :required="required"
    :rounded="rounded"
    :min="min"
    :minlength="min"
    :max="max"
    :maxlength="max"
    :placeholder="placeholder"
  >
  </b-input>
</template>

<script>
import lerp from "../../../utils/lerp";

export default {
  props: {
    size: {
      type: String,
      default: "is-default",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    maxlength: {
      type: Number,
      default: 255,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasCounter: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
    value: String,
    icon: {
      type: String,
    },
    iconRight: {
      type: String,
    },
    validationMessage: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    emitUpdate: function (val) {
      this.$emit("input", val);
    },
    emitSubmit: function () {
      this.$emit("submit");
    },
    emitBlur: function () {
      this.$emit("blur");
    },
    emitIconClick: function () {
      this.$emit("iconClick");
    },
    emitFocus: function () {
      this.$emit("focus");
    },
    emitIconRightClick: function () {
      this.$emit("iconRightClick");
    },
  },
  watch: {
    value: function (val) {
      this.emitUpdate(val);
    },
  },
  computed: {
    computedSize: function () {
      const Lerp = new lerp();
      return Lerp.buefySizeSwitch(this.size);
    },
  },
};
</script>
<style lang="scss" scoped>
.self-input {
  margin: 8px 2px 8px 2px;
}
</style>
