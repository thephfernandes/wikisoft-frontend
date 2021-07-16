<template>
  <google-signin-btn
    @click="signInWithGoogle()"
  ></google-signin-btn>
</template>

<script>
export default {
  methods: {
    signInWithGoogle() {
      console.log("authenticating with google...")
      this.$gapi
        .signIn()
        .then((user) => console.log("Signed in as:", user.name));
    },
  },
};
</script>

<style>
</style>