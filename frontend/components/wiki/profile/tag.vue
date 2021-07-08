<template>
  <div class="profile-tag">
    <WikiIconWicon
      class="profile-tag__icon"
      v-if="icon"
      :icon="icon"
      size="medium"
    />
    <p class="profile-tag__content is-size-7-mobile">
      {{ responsiveTag }}
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

  computed: {
    responsiveTag() {
      let res = this.tag;
      if (this.$device.isMobile) {
        const ampersandIndex = this.tag.indexOf("&");
        const andIndex = this.tag.indexOf("and");
        if (ampersandIndex > 0) {
          res = this.tag.slice(0, ampersandIndex);
        }
        if (andIndex > 0) {
          res = this.tag.slice(0, andIndex);
        }
      }
      return res;
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