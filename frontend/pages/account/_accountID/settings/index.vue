<template>
  <div>
    <b-modal
      v-model="init"
      has-modal-card
      trap-focus
      :active="init"
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
      class="basic-info-modal"
    >
      <template slot:default>
        <WikiProfileModalFormContact
          v-show="modalIndex === 0"
          @submit="handleContactInput"
        />

        <WikiProfileModalFormBackground
          v-show="modalIndex === 1"
          @submit="handleBackgroundInput"
        />

        <WikiProfileModalFormPhoto 
          v-show="modalIndex === 2"
          @submit="handlePhotoUpload"
        />
      </template>
    </b-modal>

    <div class="company-settings-page">
      <div class="columns">
        <div class="column is-8">
          <div class="block">
            <WikiCardPrimary>
              <template v-slot:header>
                <div class="card-header-title">
                  <WikiHeaderPrimary :size="4" :semantic="1">
                    {{ me.first_name + " " + me.last_name }}
                  </WikiHeaderPrimary>
                </div>
              </template>
              <template v-slot:content>
                <p class="has-text-grey has-text-weight-semibold">{{ me.description || "unknown employment" }}</pc>
                <p class="has-text-grey has-text-weight-semibold">
                  {{ me.location ? me.location : "" }}
                  <span v-if="me.location">·</span>
                  <a role="button" v-if="me.connections"
                    >{{
                      me.connections > 500 ? "500+" : me.connections
                    }}
                    connections</a
                  >
                  <span v-if="me.connections">·</span>
                  <a role="button"><span>Contact Info</span></a>
                </p>
                
                <div class="profile-interactions mt-3 is-flex is-justify-content-space-between">
                  <b-button class="is-link is-light">
                    <p class="is-uppercase has-text-centered has-text-weight-medium">Update Profile</p>
                  </b-button>

                  <b-button class="is-link is-light">
                    <p class="is-uppercase has-text-centered has-text-weight-medium">Download PDF</p>
                  </b-button>

                  <b-button class="is-link is-light">
                    <p class="is-uppercase has-text-centered has-text-weight-medium">Manage Settings</p>
                  </b-button>
                </div>
              </template>

              <template v-slot:footer></template>
            </WikiCardPrimary>
          </div>

          <div class="block">
            <WikiCardPrimary headerBorder>
              <template v-slot:header>
                <div class="card-header-title">
                  <WikiHeaderPrimary :size="3" :semantic="1">
                    Profile Information
                  </WikiHeaderPrimary>
                </div>
              </template>

              <template v-slot:content>
                <div class="is-flex is-flex-direction-column">
                  <b-collapse class="item" :open="false">
                      <template v-slot:trigger>
                        <div class="is-flex is-justify-content-space-between is-align-items-center">
                          <div class="item-description">
                            <p class="has-text-weight-medium mb-1">
                              Name, location and industry
                            </p>
                            <p class="has-text-grey">
                              Choose how your name and profile fields appear to other
                              members
                            </p>
                          </div>
                          <div class="item-action">
                            <a role="button">
                              <span class="has-text-grey has-text-weight-medium">
                                Change
                              </span>
                            </a>
                          </div>
                        </div>
                      </template>
                      <b-field label="First name">
                        <b-input v-model="user.first_name"></b-input>
                      </b-field>
                      <b-field label="Last name">
                        <b-input v-model="user.last_name"></b-input>
                      </b-field>
                      <b-field label="Location">
                        <b-input v-model="user.location"></b-input>
                      </b-field>
                    </b-collapse>

                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">
                        Show profile photos
                      </p>
                      <p class="has-text-grey">
                        Choose whether to show or hid profile photos of other
                        members
                      </p>
                    </div>
                    <div class="item-action">
                      <b-switch class="mr-0" v-model="showProfilePhotos"></b-switch>
                    </div>
                  </div>
                </div>
              </template>
            </WikiCardPrimary>
          </div>

          <div class="block">
            <WikiCardPrimary headerBorder>
              <template v-slot:header>
                <div class="card-header-title">
                  <WikiHeaderPrimary :size="3" :semantic="1"
                    >Account Management</WikiHeaderPrimary
                  >
                </div>
                <!-- <br />
              <p class="size-6 subtitle">Control your WikiProfile Account</p> -->
              </template>

              <template v-slot:content>
                <div class="is-flex is-flex-direction-column">
                  <b-collapse class="item">
                    <template v-slot:trigger>
                      <div class="is-flex is-justify-content-space-between is-align-items-center">
                        <div class="item-description">
                          <p class="has-text-weight-medium mb-1">Merge account</p>
                          <p class="has-text-grey">
                            Transfer your connections from a duplicate account, then
                            close it
                          </p>
                        </div>
                        <div class="item-action">
                          <a role="button">
                            <span class="has-text-grey has-text-weight-medium">
                              Change
                            </span>
                          </a>
                        </div>
                      </div>
                    </template>
                    <b-field label="email to be merged">
                      <b-input></b-input>
                    </b-field>
                  </b-collapse>
                  

                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">
                        Hibernate account
                      </p>
                      <p class="has-text-grey">
                        Temporarily deactivate your account
                      </p>
                    </div>
                    <div class="item-action">
                      <b-switch class="mr-0" v-model="hibernateAccount"></b-switch>
                    </div>
                  </div>

                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">Close account</p>
                      <p class="has-text-grey">
                        Learn about your options, and close your account if you
                        wish
                      </p>
                    </div>
                    <div class="item-action">
                      <b-button
                        @click="deletePromptActive = !deletePromptActive"
                        type="is-danger is-light"
                      >
                        <span class="has-text-weight-medium">Delete</span>
                      </b-button>
                    </div>
                  </div>
                </div>
              </template>
            </WikiCardPrimary>

            <b-modal v-model="deletePromptActive">
              <template v-slot:default="props">
                <WikiCardPrimary>
                  <template v-slot:content>
                    <b-message type="is-danger">
                      This action is permanent and cannot be undone. Please type
                      "I understand" to proceed.
                      <b-input
                        v-model="confirmDelete"
                        placeholder="I understand"
                      ></b-input>
                    </b-message>
                    <div
                      class="modal-actions is-flex is-justify-content-space-between"
                    >
                      <b-button @click="props.close">Cancel</b-button>
                      <b-button
                        type="is-danger"
                        :disabled="!hasConfirmed"
                        @click="attemptDeleteAccount"
                        >Delete</b-button
                      >
                    </div>
                  </template>
                </WikiCardPrimary>
              </template>
            </b-modal>
          </div>

          <div class="block">
            <WikiCardPrimary headerBorder>
              <template v-slot:header>
                <div class="card-header-title">
                  <WikiHeaderPrimary :size="3" :semantic="1">
                    Account Access
                  </WikiHeaderPrimary>
                </div>
              </template>

              <template v-slot:content>
                <div class="is-flex is-flex-direction-column">
                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">Email addresses</p>
                      <p class="has-text-grey">
                        Add or remove email addresses on your account
                      </p>
                    </div>
                    <div class="item-action">
                      <a role="button">
                        <span class="has-text-grey has-text-weight-medium">
                          Change
                        </span>
                      </a>
                    </div>
                  </div>

                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">Phone numbers</p>
                      <p class="has-text-grey">
                        Add a phone number in case you have trouble signing in
                      </p>
                    </div>
                    <div class="item-action">
                      <a role="button">
                        <span class="has-text-grey has-text-weight-medium">
                          Change
                        </span>
                      </a>
                    </div>
                  </div>

                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">Change password</p>
                      <p class="has-text-grey">
                        Choose a unique password to protect your account
                      </p>
                    </div>
                    <div class="item-action">
                      <a role="button">
                        <span class="has-text-grey has-text-weight-medium">
                          Change
                        </span>
                      </a>
                    </div>
                  </div>

                  <div
                    class="item is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="item-description">
                      <p class="has-text-weight-medium mb-1">
                        Two-step verification
                      </p>
                      <p class="has-text-grey">
                        Activate this feature for enhanced account security
                      </p>
                    </div>
                    <div class="item-action">
                      <b-switch class="mr-0" v-model="twoStepAuthEnabled"></b-switch>
                    </div>
                  </div>
                </div>
              </template>
            </WikiCardPrimary>
          </div>
        </div>
        <div class="column is-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default {
  middleware: "currentAccount",
  
  data() {
    let isInit = this.$route.query.init === "true" ? true : false;

    return {
      id: this.$route.params.accountID,
      init: isInit,
      modalIndex: 0,
      user: {},
      account: {},
      showProfilePhotos: Boolean,
      hibernateAccount: Boolean,
      twoStepAuthEnabled: Boolean,
      confirmDelete: "",
      deletePromptActive: false,
      loading: false,
    };
  },

  computed: {
    me() {
      return this.$store.getters["user/getUser"];
    },

    hasConfirmed() {
      return this.confirmDelete.toLowerCase() === "i understand";
    },
  },

  methods: {
    handleContactInput(form) {
      this.account = { ...this.account, ...form };
      this.modalIndex++;
    },

    handleBackgroundInput(form) {
      this.account = { ...this.account, ...form };
      this.modalIndex++;
    },

    async handlePhotoUpload(form) {
      this.account = { ...this.account, ...form };
      await this.attemptCompleteRegistration();
    },

    async attemptCompleteRegistration() {
      await this.$store.dispatch("user/updateAccount", this.account);
      this.$router.push("/");
    },

    async attemptDeleteAccount() {
      await this.$store.dispatch("user/deleteUser", this.id);
      this.$router.push("/login");
    },

  },

  async created() {
    this.user = { ...this.$auth.user };
  },
};
</script>

<style lang="scss" scoped>
.profile-settings-modal,
.job-education-modal {
  z-index: 1000;
}

.item {
  padding: 1.25rem 0;
}

.item:last-child {
  padding-bottom: 0;
}

.item:not(:last-child) {
  border-bottom: 1px solid lightgrey;
}

.profile-interactions {
  @include mobile {
    flex-direction: column;

    :not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
