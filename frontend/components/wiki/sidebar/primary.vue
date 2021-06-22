<template>
  <div class="primary-sidebar-wrapper">
    <div
      class="primary-sidebar is-flex is-flex-direction-column is-align-items-center"
    >
      <!-- <div
        class="wikiprofile-logo is-flex is-flex-direction-column is-justify-content-center"
      >
        <img src="../../../assets/wikiprofile-logo-square-blue.svg" />
        <hr />
      </div> -->

      <div class="profile-view">
        <div class="profile-image is-flex is-justify-content-center">
          <figure class="image is-128x128">
            <img
              class="profile-image is-rounded"
              :src="
                profilePhotoSrc ||
                'https://bulma.io/images/placeholders/128x128.png'
              "
              alt="profile picture"
            />
          </figure>
        </div>
        <hr />
        <div class="profile-info">
          <WikiHeaderPrimary :size="3" :semantic="3">
            {{ fullName }}
          </WikiHeaderPrimary>
        </div>
        <div class="complete-profile-prompt is-flex is-flex-direction-column is-align-items-center" v-if="!profileComplete">
          <WikiTextMultiLine>Complete your profile to see more relevant feed updates and get more profile views.</WikiTextMultiLine>
          <b-progress class="my-2" :value="60" :type="'is-success'"></b-progress>
          <WikiButtonPrimary class="my-2"
            >finish your profile</WikiButtonPrimary
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fullName() {
      return `${this.$auth.user?.first_name} ${this.$auth.user?.last_name}`;
    },

    profileComplete() {
      return false;
    },

    user() {
      return this.$auth.user
    }
  },
};
</script>

<style lang="scss" scoped>
.primary-sidebar {
  padding: 1em;
}
</style>