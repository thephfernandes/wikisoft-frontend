<template>
  <div class="wiki-panel">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {},
    computed: {},
  };
</script>

<style scoped lang="scss">
  .wiki-panel {
    padding: 30px;
    background: #ffffff;
    /* Box Stroke */

    border: 1px solid rgba(16, 48, 104, 0.3);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>
