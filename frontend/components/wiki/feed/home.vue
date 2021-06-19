<template>
  <div class="search-result-container">
    <WikiListBlock
      :class="{ animate__animated: true, animate__fadeInLeft: active, animate__fadeOutLeft: !active }"
      :collection_name="'companies'"
      is_collection
    />
    <WikiListBlock
      :class="{ animate__animated: true, animate__fadeInRight: active, animate__fadeOutRight: !active }"
      :collection_name="'companies'"
      is_collection
    />
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.search-result-container {
  z-index: 201;

  display: flex;
  @include mobile {
    flex-direction: column;
  }
}
</style>
