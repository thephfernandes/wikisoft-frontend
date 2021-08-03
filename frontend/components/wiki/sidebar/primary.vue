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
            {{ fullName }}
          </WikiHeaderPrimary>
        </div>
        <WikiProfileCompletionStatus v-if="$auth.user" />

        <WikiGoogleContactInvite v-if="isGoogleUser" />
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
      if (this.$auth.user?.first_name) {
        return `${this.$auth.user?.first_name} ${this.$auth.user?.last_name}`;
      } else if (this.googleUser) {
        return this.googleUser.fullName;
      }
    },

    isGoogleUser() {
      return this.$store.getters["user/getAuthType"] === "google";
    },
  },

  mounted() {
    this.$gapi.isSignedIn().then((signedIn) => {
      if (signedIn) {
        this.$gapi.getCurrentUser().then((user) => (this.googleUser = user));
      }
    });
  },
};
</script>