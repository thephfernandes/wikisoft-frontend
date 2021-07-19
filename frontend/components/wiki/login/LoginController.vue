<template>
  <div class="auth-panel-conntainer">
    <WikiStyleProvider :type="'is-link'" :size="'is-small'">
      <!-- <div class="upper-action-buttons">
        <NuxtLink to="/auth/sign-up">
          <WikiButtonBased ref="abdc" @click="registration = true">Join now</WikiButtonBased>
        </NuxtLink>
        <NuxtLink to="/login">
          <WikiButtonBased ref="abc" @click="registration = false" outlined>Sign in</WikiButtonBased>
        </NuxtLink>
      </div> -->
    </WikiStyleProvider>
    <div class="signin-form-wrapper">
      <WikiLoginSmallForm :errors="errorMessages" @loginAttempt="login" @registrationAttempt="signUpRedirect" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessages: [],
    };
  },
  methods: {
    // registrationAttempt: async function ({ usr, pwd }) {
    //   try {
    //     let user = await this.$directus.items("User");
    //     user
    //       .createOne({
    //         email: usr,
    //         password: pwd,
    //       })
    //       .then((val) => {})
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    signUpRedirect: function () {
      this.$router.push("/auth/sign-up");
    },

    login: async function ({ usr, pwd }) {
      try {
        await this.$auth.login({
          email: usr,
          password: pwd,
          mode: "json",
        });

        this.$store.commit("user/setAuthenticated", true);
        await this.$store.dispatch("user/fetchAccount");
      } catch (error) {
        if (error && error.data) this.errorMessages = error.data;
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}
.auth-panel-conntainer {
  height: 100%;
  width: 100%;
}
.separator::before,
.separator::after {
  content: " ";
  flex: 1;
  border-bottom: 1px solid #000;
}
.separator:not(:empty)::before {
  margin-right: 0.25em;
}
.separator:not(:empty)::after {
  margin-left: 0.25em;
}
.upper-action-buttons {
  position: absolute;
  right: 25px;
}
.signin-form-wrapper {
  display: grid;
  height: 100%;
  width: 100%;
  justify-content: center;
}

.password-reset-container {
  p {
    text-align: center;
    margin: 1em;
  }
  text-align: center;
  margin: 16px;
}
.inner-form-wrapper {
  max-width: 420px;
  width: 100%;
  justify-self: center;
  align-self: center;
}
</style>
