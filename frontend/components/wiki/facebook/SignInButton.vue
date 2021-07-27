<template>
  <div
    class="fb-login-button"
    data-size="large"
    data-button-type="continue_with"
    data-layout="default"
    data-use-continue-as="false"
    :onlogin="checkLoginState()"
  ></div>
  <!-- <div>
    <fb:login-button scope="public_profile,email" :onlogin="checkLoginState();">
    </fb:login-button>
  </div> -->
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      isFBReady: false,
    };
  },

  mounted() {
    this.isFBReady = Vue.FB !== undefined;
    window.addEventListener("fb-sdk-ready", this.onFBReady);
  },

  beforeDestroy() {
    window.removeEventListener("fb-sdk-ready", this.onFBReady);
  },

  methods: {
    onFBReady() {
      this.isFBReady = true;
      this.checkLoginState();
    },

    checkLoginState() {
      if (this.isFBReady) {
        Vue.FB.getLoginStatus((response) => {
          console.log(response);
          if (response.status === "connected") {
            this.$store.commit("user/setUser", response.authResponse);
            this.$store.commit("user/setAuthType", "facebook");
            this.$router.push("/");
          }
        });
      }

      // this.$fb.sdk.getLoginStatus((response) => {
      //   console.log(response)
      //   if (response.status === "connected") {
      //     this.$store.commit("user/setUser", response.authResponse);
      //     this.$store.commit("user/setAuthType", "facebook");
      //     this.$router.push("/");
      //   }
      // });
    },
  },
};
</script>

<style>
</style>