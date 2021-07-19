<template>
  <div class="primary-sidebar-wrapper">
    <div
      class="
        primary-sidebar
        is-flex is-flex-direction-column is-align-items-center
      "
    >
      <div class="profile-view">
        <div class="is-flex is-justify-content-center">
          <WikiProfilePhoto class="image" />
        </div>
        <hr />
        <div class="profile-info">
          <WikiHeaderPrimary :size="3" :semantic="3">
            {{ googleUser.Ys.Ve || fullName }}
          </WikiHeaderPrimary>
        </div>
        <div
          class="
            complete-profile-prompt
            is-flex is-flex-direction-column is-align-items-center
          "
          v-if="!profileComplete"
        >
          <WikiTextMultiLine
            >Complete your profile to see more relevant feed updates and get
            more profile views.</WikiTextMultiLine
          >
          <b-progress
            class="my-2"
            :value="60"
            :type="'is-success'"
          ></b-progress>
          <WikiButtonPrimary class="my-2" v-if="!profileComplete"
            >finish your profile</WikiButtonPrimary
          >
          <WikiGoogleContactInvite></WikiGoogleContactInvite>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoSrc: undefined,
      googleUser: {},
    };
  },

  computed: {
    fullName() {
      if (!this.googleUser) {
        return `${this.$auth.user?.first_name} ${this.$auth.user?.last_name}`;
      } else {
        return this.googleUser.fullName;
      }
    },

    profileComplete() {
      return false;
    },
  },

  async mounted() {
    this.googleUser = await this.$gapi.getCurrentUser();
  },
};
</script>

<style lang="scss" scoped>
.primary-sidebar {
  padding: 1em;
}
</style>