<template>
  <div class="g-signin" @click="signInWithGoogle">
    <span class="icon"></span>
    <span class="text">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: "Sign in with Google",
    },
  },

  methods: {
    signInWithGoogle() {
      this.$gapi.login().then(({ currentUser }) => {
        this.$store.dispatch("user/setGoogleUser", currentUser);
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.g-signin {
  display: inline-block;
  background: #fff;
  color: #555;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
  box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
  white-space: nowrap;

  .icon {
    background-image: url(https://developers.google.com/identity/images/g-logo.png);
    background-size: 26px 26px;
    background-repeat: no-repeat;
    background-position: center center;
    display: inline-block;
    vertical-align: middle;
    padding-left: 8px;
    width: 42px;
    height: 42px;
  }

  .text {
    display: inline-block;
    vertical-align: middle;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 14px;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
  }
}
</style>