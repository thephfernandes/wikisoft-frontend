<template>
  <div class="profile-tag">
    <WikiIconWicon class="profile-tag__icon" v-if="icon" :icon="icon" size="medium" />
    <p class="profile-tag__content">
      {{ tag }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-tag__icon {
    margin-right: 1rem;
}

.profile-tag__content {
  background-color: #e3f2ff;
  color: royalblue;
  padding: 0.5rem 1rem;
}
</style>