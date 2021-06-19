<template>
  <WikiButtonBased :type="'is-primary'" @click="emit('click')">
    <slot></slot>
  </WikiButtonBased>
</template>

<script>
export default {
  name: "",
  props: {},
  computed: {},
};
</script>

<style scoped lang="scss"></style>
