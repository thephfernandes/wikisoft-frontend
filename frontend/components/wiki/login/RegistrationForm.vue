<template>
  <div class="registration-form">
    <b-steps v-model="activeStep" :has-navigation="false" :mobile-mode="null">
      <WikiDataErrorMessage
        v-if="errors.length > 0"
        isError
        :messages="errors"
      ></WikiDataErrorMessage>
      <b-step-item step="0" label="Step 1" :clickable="false" class="step-item">
        <WikiHeaderPrimary :semantic="1" :size="3" class="mb-5">
          Please type your email and wikiprofile password
        </WikiHeaderPrimary>
        <WikiFormBaseForm>
          <template v-slot:form>
            <WikiFormField :label="'Email'">
              <WikiInput
                value="email"
                expanded
                type="email"
                @input="email = $event"
              />
            </WikiFormField>
            <WikiFormField :label="'Password (6 or more characters)'">
              <WikiInput
                value="pwd"
                expanded
                :type="'password'"
                @input="pwd = $event"
                size
              />
            </WikiFormField>
          </template>
        </WikiFormBaseForm>
        <WikiTextMultiLine>
          By clicking Agree & Join, you agree to the Wikisoft
          <a href="#">User Agreement</a>,<a href="#">Privacy Policy</a>, and
          <a>Cookie Policy</a>
        </WikiTextMultiLine>
        <div class="is-flex is-flex-direction-column">
          <WikiButton
            @click="nextStep"
            :disabled="isMissingFields"
            class="my-2"
            expanded
            >Agree & Join</WikiButton
          >
          <line class="seperator my-2">or</line>
          <WikiButton class="my-2" expanded>Continue with Facebook</WikiButton>
          <WikiButton class="my-2" expanded>Continue with Google</WikiButton>
        </div>

        <WikiTextTLine
          >Already on Wikiprofile?
          <nuxt-link to="/login">Login</nuxt-link></WikiTextTLine
        >
      </b-step-item>

      <!-- <b-step-item step="2" label="Step 2" :clickable="false">
        <WikiHeaderPrimary>Lets confirm your email</WikiHeaderPrimary>
        <WikiTextTLine>Type in code we sent to your email address.</WikiTextTLine>
        <WikiInput v-model="confirmationCode" placeholder="000000"></WikiInput>
        <WikiButton @click="activeStep = '3'" expand>Agree & Confirm</WikiButton>
        <WikiTextTLine
          >Didn't recieve the code?
          <a @onClick="console.log('Add code resend call')"
            >Send again</a
          ></WikiTextTLine
        >
      </b-step-item> -->

      <b-step-item step="1" label="Step 2" :clickable="false" class="px-6">
        <div
          class="captcha-wrapper is-flex is-flex-direction-column is-align-items-center"
        >
          <WikiHeaderPrimary
            :semantic="1"
            :size="4"
            class="mb-5 captcha-header"
          >
            Confirm you aren't a robot
          </WikiHeaderPrimary>
          <WikiFormBaseForm>
            <template v-slot:form>
              <VueRecaptcha
                sitekey="6LczvsMaAAAAAL7EXney9dDi4hDYK1HsHLVe-m0z"
                @verify="verified = true"
                loadRecaptchaScript
              >
              </VueRecaptcha>
              <WikiButton
                class="my-2"
                :disabled="!verified"
                @click="redirectCompleteProfile"
                expanded
                ><span class="is-uppercase">confirm</span>
              </WikiButton>
            </template>
          </WikiFormBaseForm>
        </div>
      </b-step-item>
    </b-steps>
  </div>
</template>

<script>
import textLine from "../text/textLine.vue";
import FormField from "../form/FormField.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
  components: {
    textLine,
    FormField,
    VueRecaptcha,
  },

  data() {
    return {
      email: "",
      pwd: "",
      activeStep: 0,
      confirmationCode: String,
      verified: false,
      errors: [],
    };
  },

  methods: {
    nextStep() {
      this.activeStep = this.activeStep + 1;
    },

    registerUser: async function () {},

    async redirectCompleteProfile() {
      await this.$store.dispatch("user/createUser", {
        email: this.email,
        password: this.pwd,
        role: "b61a2ccb-fcca-4a3d-a006-9713994449ba",
      });
      // await this.$store.dispatch("user/createAccount");
      await this.$auth.login({
        email: this.email,
        password: this.pwd,
      });
      this.$router.push(`/account/${this.$auth.user.id}/settings?init=true`);
    },
  },

  computed: {
    isMissingFields() {
      return !(this.email && this.pwd);
    },

    account() {
      return this.$store.getters["user/getAccount"];
    }
  },
};
</script>

<style lang="scss" scoped>
.captcha-header {
  text-align: center;
  @include desktop {
    width: 450px;
  }
}

.step-item {
  align-self: center;
  @include desktop {
    width: 65%;
  }
}
</style>
