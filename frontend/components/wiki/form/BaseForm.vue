<template>
  <div class="base-form-container block">
    <div class="base-form-header-container">
      <WikiHeaderPrimary :semantic="1" :size="3">
        {{ title }}
      </WikiHeaderPrimary>
    </div>
    <div class="base-form-content-container">
      <form v-on:submit.prevent="$emit('submit')">
        <slot name="form"></slot>
      </form>
    </div>
    <div class="base-form-actionbuttons-container">
      <slot name="actionButtons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.base_form_container {
  display: grid;
  grid-template-rows: 80px auto 80px;
  grid-template-columns: auto;
  grid-template-areas:
    "header"
    "form"
    "footer";
  width: 100%;
  height: 100%;
}
.base-form-header-container {
  grid-area: header;
}
.base-form-content-container {
  grid-area: form;
}
.base-form-actionbuttons-container {
  grid-area: footer;
}
</style>
