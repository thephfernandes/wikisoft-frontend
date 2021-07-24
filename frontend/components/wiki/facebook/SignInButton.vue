<template>
  <div
    class="fb-login-button"
    data-size="large"
    data-button-type="login_with"
    data-layout="default"
    data-auto-logout-link="false"
    data-use-continue-as="true"
    @click="facebookLoginHandle"
  ></div>
</template>

<script>
export default {
  methods: {
    checkLoginState() {
      FB.getLoginStatus((response) => {
        if (response.status === "connected") {
          this.$store.commit("user/setUser", response.authResponse);
          this.$store.commit("user/setAuthType", "facebook");
        }
      });
    },

    async facebookLoginHandle() {
      try {
        const res = await this.$axios.get("https://beta.wikiprofile.com" || "https://io.wikiprofile.com" + "/auth/oauth/facebook");
        this.$store.dispatch("user/setFacebookUser", res);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style>
</style>