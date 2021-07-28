<template>
  <div class="auth-panel-container">
    You have succesfully logged in with Linkedin!
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  layout: "auth",

  data() {
    return {
      oauthCode: this.$route.query.code,
      returnedState: this.$route.query.state,
    };
  },

  mounted() {
    if (this.returnedState !== this.state) {
      console.error("cors state key mismatch, the state returned from linkedin does not match the sent one")
      this.$router.push("/login");
    } else {
      this.getAccessToken();
      this.$router.push("/");
      // this.confirmOAuthRedirect();
    }
  },

  computed: {
    ...mapGetters({ state: "oAuth/getCorsState" }),
  },

  methods: {
    ...mapMutations({
      setOAuthCode: "oAuth/setOAuthCode",
      setAuthenticated: "oAuth/setAuthenticated",
    }),

    async getAccessToken() {
      //TODO: will never work from frontend, directus needs to do this...
      // const res = await this.$axios.post(
      //   `${process.env.OAUTH_LINKEDIN_ACCESS_URL}`,
      //   {
      //     grant_type: "authorization_code",
      //     code: this.oauthCode,
      //     client_id: process.env.OAUTH_LINKEDIN_CLIENT_ID,
      //     client_secret: process.env.OAUTH_LINKEDIN_CLIENT_SECRET,
      //     redirect_uri: `${process.env.PUBLIC_URL}/auth/oauth/linkedin`,
      //   },
      //   {
      //     headers: {
      //       'content-type': 'x-www-form-urlencoded'
      //     }
      //   }
      // );
      // console.log(res);
      console.log("fetching access token...");
    },

    confirmOAuthRedirect() {
      // this.setOAuthCode(this.oauthCode);
      // this.setAuthenticated(true);
      // this.$router.push("/");
    },
  },
};
</script>

<style>
.auth-panel-conntainer {
  height: 100%;
  width: 100%;
}
</style>
