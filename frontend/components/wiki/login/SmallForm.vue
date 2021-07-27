<template>
  <div class="signin-form-container">
    <WikiStyleProvider :type="'is-primary'" :size="'default'">
      <WikiHeaderPrimary :semantic="6" :size="6"
        >Welcome Back</WikiHeaderPrimary
      >
      <MultiLine :size="0.35"
        >Don't miss your next opportunity. Sign in to stay updated on your
        professional world.</MultiLine
      >
      <WikiDataErrorMessage
        v-if="errors.length > 0"
        isError
        :messages="errors"
      ></WikiDataErrorMessage>
      <BaseForm class="inner-form-wrapper" @submit="emit_login">
        <template v-slot:form>
          <Input
            :expanded="true"
            v-model="usr"
            :type="'text'"
            :placeholder="'Email or Phone'"
            @keyup.enter.native="emit_login()"
          />
          <Input
            v-model="pwd"
            :expanded="true"
            :type="'password'"
            :placeholder="'Password'"
            v-on:submit="emit_login"
            @keyup.enter.native="emit_login()"
          />
          <Button :rounded="false" :expanded="true" @click="emit_login"
            >Sign in</Button
          >
          <br />
          <p class="is-uppercase has-text-centered">or</p>
          <br />
          <div class="ouath-btn-wrapper">
            <WikiGoogleSignInButton />
            <!-- <WikiFacebookSignInButton /> -->
            <WikiLoginLinkedinButton @click="linkedin_login_handle" />
          </div>
        </template>
      </BaseForm>
      <div class="password-reset-container">
        <MultiLine :size="0.3" :weight="0.7">
          <NuxtLink to="/account/recover">Forgot password?</NuxtLink> <br />
          New to Wikisoft? <NuxtLink to="/account/register">sign up</NuxtLink>
        </MultiLine>
      </div>
    </WikiStyleProvider>
  </div>
</template>

<script>
import BaseForm from "../form/BaseForm.vue";
import MultiLine from "../text/MultiLine.vue";
import Button from "../button/based.vue";
import Input from "../input/index.vue";

export default {
  components: {
    MultiLine,
    BaseForm,
    Input,
    Button,
  },
  props: {
    errors: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      pwd: "",
      usr: "",
    };
  },
  methods: {
    linkedin_login_handle: async function () {
      try {
        const resp = await this.$axios.get(
          ("https://beta.wikiprofile.com" || "https://io.wikiprofile.com") +
            "/auth/oauth/login/linkedin"
        );
        this.$store.dispatch("user/setLinkedinUser", resp);
      } catch (error) {
        this.$buefy.toast.open({
          message: error,
          type: "is-danger",
        });
      }
    },
    emit_login: function () {
      try {
        if (this.usr && this.pwd) {
          this.$emit("loginAttempt", { usr: this.usr, pwd: this.pwd });
        } else {
          this.$buefy.toast.open({
            type: "is-warning",
            message: "Please enter your login credentials below",
          });
        }
      } catch (error) {
        this.$buefy.toast.open({
          type: "is-danger",
          message: error,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ouath-btn-wrapper {
  display: grid;
  grid-auto-flow: row;
  grid-template: 100%;
  gap: 12px;
  padding: 12px;
}
.signin-form-container {
  @include desktop {
    max-width: 30vw;
  }
  @include tablet {
    max-width: 40vw;
  }

  display: grid;
  text-align: center;
  p {
    text-align: left;
  }
  justify-self: center;
  align-self: center;
  margin: auto;
}

.third-party-auth-buttons {
  width: 100%;

  > * {
    flex-grow: 1;
  }
}
</style>
