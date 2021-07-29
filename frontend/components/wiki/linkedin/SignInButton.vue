<template>
  <div class="linkedin-signin-button" @click="attemptLinkedinOAuth">
    <div class="logo-bug-container">
      <img src="../../../assets/logos/linkedin/LI-In-Bug.png" />
    </div>
    <span
      >Sign in with Linkedin</span
    >
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      state: "myTestStateNoCORS",
      scope: "r_liteprofile%20r_emailaddress",
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

<style lang="scss" scoped>
img {
  height: 42px;
}

span {
  color: white;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 14px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}

span,
.logo-bug-container {
  display: inline-block;
  vertical-align: middle;
}

.logo-bug-container {
  height: 100%;
  border-radius: 1rem;
}

.linkedin-signin-button {
  height: 42px;
  width: 100%;
  background: #0077b5;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  text-align: center;

  .logo-bug-container {
    background: linear-gradient(
      to right,
      white,
      white 80%,
      #0077b5 20%,
      #0077b5
    );
  }
}

.linkedin-signin-button:hover {
  background: #004182;

  .logo-bug-container {
    background: linear-gradient(
      to right,
      white,
      white 80%,
      #004182 20%,
      #004182
    );
  }
}

.linkedin-signin-button:active {
  background: #006097;

  .logo-bug-container {
    background: linear-gradient(
      to right,
      white,
      white 80%,
      #006097 20%,
      #006097
    );
  }
}
</style>