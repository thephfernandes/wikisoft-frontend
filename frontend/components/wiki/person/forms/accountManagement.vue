<template>
  <div>
    <b-collapse :open="false">
      <template v-slot:trigger>
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <div class="item-description">
            <WikiHeaderPrimary id="header" :semantic="1" :size="2"
              >Merge account</WikiHeaderPrimary
            >
            <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
              Transfer connections from duplicate account then close it.
            </WikiHeaderPrimary>
          </div>
          <div class="item-action">
            <span @click="handleMergeAccount">
              <a role="button">
                <span class="has-text-grey has-text-weight-medium">
                  Change
                </span>
              </a>
            </span>
          </div>
        </div>
      </template>
      <b-field label="email to be merged">
        <b-input @input="emitMergeRequest" type="email" v-model="mergeEmail"></b-input>
      </b-field>
    </b-collapse>
    <hr />
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <div class="item-description">
        <WikiHeaderPrimary id="header" :semantic="1" :size="2"
          >Hibernate account</WikiHeaderPrimary
        >
        <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
          Temporarily deactivate your account
        </WikiHeaderPrimary>
      </div>
      <div class="item-action">
        <b-switch
          class="mr-0"
          :disabled="$auth.user == null"
          v-model="hibernateAccount"
          @input="toggleHibernateAccount"
        />
      </div>
    </div>
    <hr />

    <b-collapse :open="false">
      <template v-slot:trigger>
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <div class="item-description">
            <WikiHeaderPrimary id="header" :semantic="1" :size="2"
              >Close account</WikiHeaderPrimary
            >
            <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
              Learn about your options, and close your account if you wish
            </WikiHeaderPrimary>
          </div>
          <div class="item-action">
            <!-- <b-button
              type="is-danger is-light"
            >
              <span class="has-text-weight-medium">Delete</span>
            </b-button> -->
            <a role="button">
              <span class="has-text-grey has-text-weight-medium"> Change </span>
            </a>
          </div>
        </div>
      </template>
      <template v-slot:default>
        <b-message type="is-danger">
          This action is permanent and cannot be undone. Please type "I
          understand" to proceed.
          <b-input v-model="confirmDelete" placeholder="I understand"></b-input>
        </b-message>
        <div class="modal-actions is-flex is-justify-content-space-between">
          <b-button>Cancel</b-button>
          <b-button
            type="is-danger"
            :disabled="!hasConfirmed"
            @click="attemptDeleteAccount"
            >Delete</b-button
          >
        </div>
      </template>
    </b-collapse>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "WikiPersonFormsAccountManagement",

  data() {
    return {
      confirmDelete: "",
      id: this.$route.params.peopleID,
      mergeEmail: "",
      hibernateAccount: "",
    };
  },

  created() {
    this.emitMergeRequest = _.debounce(this.emitMergeRequest, 300);
    this.emitFormChange = _.debounce(this.emitFormChange, 300);
  },

  computed: {
    tfaSecret() {
      return this.$auth.tfa_secret;
    },

    hasConfirmed() {
      return this.confirmDelete.toLowerCase() === "i understand";
    },
  },

  methods: {
    async attemptDeleteAccount() {
      await this.$store.dispatch("people/deleteMe");
      this.$router.push("/");
    },

    handleAccountClose: function () {},
    handleMergeAccount: function () {},

    emitFormChange() {
      this.$emit("input", {
        hibernate: this.hibernateAccount,
      });
    },

    emitMergeRequest() {
      this.$emit("merge", {
        email: this.mergeEmail,
      });
    },

    toggleHibernateAccount(value) {
      console.log("toggling...", value);
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
