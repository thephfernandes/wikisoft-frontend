<template>
  <div :class="{ message: true, 'is-success': isSuccess, 'is-danger': isError, 'is-warning': isWarning }">
    <div class="message-header">
      <b-icon v-if="leftIcon !== ''" :icon="leftIcon" />
      <WikiHeaderPrimary :size="2" :semantic="1" v-if="header !== undefined">{{ header }}</WikiHeaderPrimary>
      <WikiHeaderPrimary :size="2" :semantic="1" v-else-if="isSuccess">Server responsed with</WikiHeaderPrimary>
      <WikiHeaderPrimary :size="2" :semantic="1" v-else-if="isWarning">Server warns you about</WikiHeaderPrimary>
      <WikiHeaderPrimary :size="2" :semantic="1" v-else-if="isError">Server failed because of</WikiHeaderPrimary>
      <button v-if="closable" class="delete" aria-label="delete" @click="close"></button>
    </div>
    <div class="message-body">
      <ul>
        <li v-for="(data, index) in messages" :key="index">
          <WikiTextMultiLine :size="0.4">
            {{ data.message }}
          </WikiTextMultiLine>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiDataErrorMessage",
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: "",
    },
    header: { type: String },
    messages: {
      type: Array,
      default: () => {
        return [
          {
            message: "this is a default message",
          },
        ];
      },
    },
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
  },
  mounted() {
    if ((this.isWarning && this.isSuccess) || (this.isError && this.isSuccess) || (this.isWarning && this.isError)) {
      return console.error("Invalid style props on DataErrorMessage component");
    }
  },
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
