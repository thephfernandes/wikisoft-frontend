<template>
  <div>
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <div class="item-description">
        <WikiHeaderPrimary id="header" :semantic="1" :size="2"
          >Email address</WikiHeaderPrimary
        >
        <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
          Add or remove email addresses on your account
        </WikiHeaderPrimary>
      </div>
      <div class="item-action">
        <span @click="handleChangeEmail">
          <a role="button">
            <span class="has-text-grey has-text-weight-medium"> Change </span>
          </a>
        </span>
      </div>
    </div>
    <hr />
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <div class="item-description">
        <WikiHeaderPrimary id="header" :semantic="1" :size="2"
          >Phone numbers</WikiHeaderPrimary
        >
        <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
          Add a phone number in case you have trouble signing in
        </WikiHeaderPrimary>
      </div>
      <div class="item-action">
        <span @click="handleChangePhone">
          <a role="button">
            <span class="has-text-grey has-text-weight-medium"> Change </span>
          </a>
        </span>
      </div>
    </div>
    <hr />
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <div class="item-description">
        <WikiHeaderPrimary id="header" :semantic="1" :size="2"
          >Change password</WikiHeaderPrimary
        >
        <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
          Choose a unique password to protect your account
        </WikiHeaderPrimary>
      </div>
      <div class="item-action">
        <span @click="handleChangePassword">
          <a role="button">
            <span class="has-text-grey has-text-weight-medium"> Change </span>
          </a>
        </span>
      </div>
    </div>
    <hr />
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <div class="item-description">
        <WikiHeaderPrimary id="header" :semantic="1" :size="2"
          >Two-step verification</WikiHeaderPrimary
        >
        <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
          Activate this feature for enhanced account security
        </WikiHeaderPrimary>
      </div>
      <div class="item-action">
        <b-switch
          class="mr-0"
          :value="tfaSecret"
          :disabled="$auth.user == null"
        />
      </div>
    </div>

    <b-modal
      v-model="email_modal_active"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <template>
        <div class="modal-card" style="width: auto">
          <section class="modal-card-body">
            <b-field label="New email">
              <b-input type="email" v-model="email" maxlength="50"> </b-input>
            </b-field>
            <b-field label="Confirm email">
              <b-input type="email" v-model="email_confirm" maxlength="50">
              </b-input>
            </b-field>
          </section>
          <section class="modal-card-foot">
            <b-field grouped expanded position="is-centered">
              <b-field expanded>
                <b-button
                  type="is-warning"
                  expanded
                  @click="email_modal_active = false"
                  >Cancel</b-button
                >
              </b-field>
              <b-field expanded>
                <b-button type="is-success" expanded @click="handleUpdateEmail"
                  >Save</b-button
                >
              </b-field>
            </b-field>
          </section>
        </div>
      </template> 
    </b-modal>
    
    <b-modal
      v-model="password_modal_active"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <template>
        <div class="modal-card" style="width: auto">
          <section class="modal-card-body">
            <b-field label="Verification code">
              <b-input type="text" :value="pwd_code" maxlength="50"> </b-input>
            </b-field>
            <b-field expanded>
              <b-button
                type="is-link"
                expanded
                @click="handlePasswordDigestRequest"
                >Send verification</b-button
              >
            </b-field>
            <hr />
            <b-field label="new password">
              <b-input type="text" :value="pwd" maxlength="50"> </b-input>
            </b-field>
            <b-field label="confirm new password">
              <b-input type="text" :value="pwd_confirm" maxlength="50">
              </b-input>
            </b-field>
          </section>
          <section class="modal-card-foot">
            <b-field grouped expanded position="is-centered">
              <b-field expanded>
                <b-button
                  type="is-warning"
                  expanded
                  @click="password_modal_active = false"
                  >Cancel</b-button
                >
              </b-field>
              <b-field expanded>
                <b-button
                  type="is-success"
                  expanded
                  @click="handleUpdatePassword"
                  >Save</b-button
                >
              </b-field>
            </b-field>
          </section>
        </div>
      </template> 
    </b-modal>

    <b-modal
      v-model="phone_modal_active"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <template>
        <div class="modal-card" style="width: auto">
          <section class="modal-card-body">
            <b-field label="New phone number">
              <b-input type="phone" v-model="phone_number" maxlength="50">
              </b-input>
            </b-field>
            <!-- <hr />
            <b-field label="Verification code">
              <b-input type="email" :value="delta_email" maxlength="50"> </b-input>
            </b-field> -->
          </section>
          <section class="modal-card-foot">
            <b-field grouped expanded position="is-centered">
              <b-field expanded>
                <b-button
                  type="is-warning"
                  expanded
                  @click="phone_modal_active = false"
                  >Cancel</b-button
                >
              </b-field>
              <b-field expanded>
                <b-button type="is-success" expanded @click="handleUpdatePhone"
                  >Save</b-button
                >
              </b-field>
            </b-field>
          </section>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "WikiPersonFormsAccountAccess",
  props: {
    id: {
      type: String,
      required: true,
      // default: this.$user.person_profiles[0],
      // default: async function () {
      //   if (this.$user && this.$user.id && this.$user.person_profiles[0]) {
      //     return this.$user.person_profiles[0];
      //   }
      // },
    },
  },

  data() {
    return {
      email_modal_active: false,
      password_modal_active: false,
      phone_modal_active: false,
      email: "",
      email_confirm: "",
      pwd: "",
      pwd_code: "",
      pwd_confirm: "",
      phone_number: "",
      twostep: "",
    };
  },

  computed: {
    tfaSecret() {
      return this.$auth.tfa_secret;
    },
  },

  methods: {
    ...mapGetters(["people/getMePeople", "people/fetchPeople"]),
    ...mapActions([
      "people/updateMe",
      "people/updatePerson",
      "people/updatePassword",
      "people/requestPasswordDigest",
      "people/getMePeople",
    ]),
    handleChangeEmail: function () {
      this.email_modal_active = true;
    },
    handleChangePhone: function () {
      this.phone_modal_active = true;
    },
    handleChangePassword: function () {
      this.password_modal_active = true;
    },
    handlePasswordDigestRequest: async function () {
      try {
        const response = await this.requestPasswordDigest();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    handleUpdatePassword: async function () {
      try {
        const response = await this.updatePassword();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },

    handleUpdatePhone: async function () {
      await this.$store.dispatch("people/updateMe", { phone_number: this.phone_number });
      // try {
      //   const response = await this.$auth.user.me.update({
      //     phone_number: this.phone_number,
      //   });
      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }
    },

    handleUpdateEmail: async function () {
      await this.$store.dispatch("people/updateMe", { email: this.email });
      // try {
      //   const response = await this.requestPasswordDigest();
      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }

    },
  },
};
</script>
<style lang="scss" scoped>
.bfield-inner-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
