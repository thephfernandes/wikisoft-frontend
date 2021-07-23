<template>
  <div
    class="fb-login-button"
    data-size="large"
    data-button-type="login_with"
    data-layout="default"
    data-auto-logout-link="false"
    data-use-continue-as="true"
    @onlogin="checkLoginState()"
  ></div>
</template>

<script>
export default {
  methods: {
    checkLoginState() {
      FB.getLoginStatus((response) => console.log(response));
    }
  }
};
</script>

<style>
</style>