<template>
  <div>
    <div class="reset-password-page container">
      <div class="tile is-parent-fullhd block">
        <div class="tile is-child is-8">
          <WikiCardPrimary>
            <template v-slot:header>
              <div class="card-header-title px-0">
                <WikiHeaderPrimary :semantic="5" :size="3">
                  Reset your password
                </WikiHeaderPrimary>
              </div>
            </template>
            <template v-slot:content>
              <div v-if="!resetToken">
                <b-field label="Previous Password" expanded>
                  <b-input required v-model="oldPassword" type="password" password-reveal></b-input>
                </b-field>
              </div>

              <b-field label="New password" expanded>
                <b-input
                  required
                  v-model="newPassword"
                  expanded
                  type="password"
                  validation-message="Minimum eight characters, at least one letter, one number and one special character"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                  password-reveal
                ></b-input>
              </b-field>

              <b-field
                label="Confirm your new password"
                expanded
                :type="matchPasswordValidationMessage ? 'is-danger' : ''"
                :message="matchPasswordValidationMessage"
              >
                <b-input required v-model="newPasswordConfirm"></b-input>
              </b-field>
            </template>

            <template v-slot:footer>
              <div class="is-flex is-justify-content-space-between is-align-items-center password-reset-actions">
                <WikiButtonBased class="is-light" @click="cancelPasswordReset">Cancel</WikiButtonBased>
                <WikiButtonBased class="is-primary" :disabled="!passwordsMatch" @click="attemptPasswordReset">Reset</WikiButtonBased>
              </div>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resetToken: this.$router.query?.token ? this.$router.query.token : "",
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },

  computed: {
    passwordsMatch() {
      return this.newPassword === this.newPasswordConfirm;
    },

    matchPasswordValidationMessage() {
      if (!this.newPassword) {
        return;
      }

      if (!this.newPasswordConfirm) {
        return "Please fill out this field";
      }

      if (!this.passwordsMatch) {
        return "Passwords don't match";
      }
    },
  },

  methods: {
    cancelPasswordReset() {
      this.$router.push("/");
    },

    attemptPasswordReset() {
      //TODO: verify previous password
      console.log("updating password...");
    }
  },

  mounted() {
    if (this.resetToken) {
      //TODO: verify token
    }
  }
};
</script>

<style lang="scss">
.password-reset-actions {
  width: 100%;
}
</style>
 