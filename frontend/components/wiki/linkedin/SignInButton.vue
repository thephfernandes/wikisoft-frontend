<template>
  <a role="button" @click="attemptLinkedinOAuth">Sign in with Linkedin</a>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      state: "myTestStateNoCORS",
      scope: "r_liteprofile%20r_emailaddress"
    };
  },

  mounted() {
    this.setState(this.state);
  },

  methods: {
    ...mapMutations({ setState: "oAuth/setCorsState" }),

    attemptLinkedinOAuth() {
      window.open(
        `${process.env.OAUTH_LINKEDIN_AUTHORIZE_URL}?response_type=code&client_id=${process.env.OAUTH_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.PUBLIC_URL}/auth/oauth/linkedin&state=${this.state}&scope=${this.scope}`
      );
    },
  },
};
</script>

<style>
</style>