<template>
  <div>
    <div class="company-settings-page">
      <div class="columns">
        <div class="column is-8">
          <div class="block">
            <!-- The top of the page profile card  -->

            <WikiCardPrimary>
              <template v-slot:header>
                <div class="card-header-title px-0">
                  <WikiHeaderPrimary :size="4" :semantic="1">
                    {{ $auth.user.first_name + " " + $auth.user.last_name }}
                  </WikiHeaderPrimary>
                </div>
              </template>
              <template v-slot:content>
                <p class="has-text-grey has-text-weight-semibold">
                  {{ $auth.user.description || "unknown employment" }}
                </p>
                <p class="has-text-grey has-text-weight-semibold">
                  {{ $auth.user.location ? $auth.user.location : "" }}
                  <span v-if="$auth.user.location">·</span>
                  <a role="button" v-if="$auth.user.connections"
                    >{{
                      $auth.user.connections > 500
                        ? "500+"
                        : $auth.user.connections
                    }}
                    connections</a
                  >
                  <span v-if="$auth.user.connections">·</span>
                  <a role="button"><span>Contact Info</span></a>
                </p>

                <!-- <div class="profile-interactions mt-3 is-flex is-justify-content-space-between">
                  <b-button class="is-link is-light">
                    <p class="is-uppercase has-text-centered has-text-weight-medium">Update Profile</p>
                  </b-button>

                  <b-button class="is-link is-light">
                    <p class="is-uppercase has-text-centered has-text-weight-medium">Download PDF</p>
                  </b-button>

                  <b-button class="is-link is-light">
                    <p class="is-uppercase has-text-centered has-text-weight-medium">Manage Settings</p>
                  </b-button>
                </div> -->
              </template>
            </WikiCardPrimary>
          </div>

          <!-- Account contact details  -->

          <div class="block">
            <WikiCardPrimary headerBorder>
              <template v-slot:header>
                <div class="card-header-title px-0">
                  <WikiHeaderPrimary :size="3" :semantic="1">
                    Profile Information
                  </WikiHeaderPrimary>
                </div>
              </template>

              <template v-slot:content>
                <div class="is-flex is-flex-direction-column">
                  <b-collapse class="item" :open="false">
                    <template v-slot:trigger>
                      <div
                        class="
                          is-flex
                          is-justify-content-space-between
                          is-align-items-center
                        "
                      >
                        <div class="item-description">
                          <p class="has-text-weight-medium mb-1">
                            Name, location and industry
                          </p>
                          <p class="has-text-grey">
                            Choose how your name and profile fields appear to
                            other members
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
                      <b-input
                        :value="$auth.user.first_name"
                        @input="handleInput('first_name', $event)"
                      ></b-input>
                    </b-field>
                    <b-field label="Last name">
                      <b-input
                        :value="$auth.user.last_name"
                        @input="handleInput('last_name', $event)"
                      ></b-input>
                    </b-field>
                    <b-field label="Location">
                      <b-input
                        :value="$auth.user.location"
                        @input="handleInput('location', $event)"
                      ></b-input>
                    </b-field>
                    <b-field label="Industry">
                      <b-input
                        :value="$auth.user.job_title"
                        @input="handleInput('industry', $event)"
                      ></b-input>
                    </b-field>
                  </b-collapse>

                  <div
                    class="
                      item
                      is-flex
                      is-justify-content-space-between
                      is-align-items-center
                    "
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
                      <b-switch
                        class="mr-0"
                        :value="$auth.user.show_profile_pic"
                        @input="handleInput('show_profile_pic', $event)"
                      ></b-switch>
                    </div>
                  </div>
                </div>
              </template>
            </WikiCardPrimary>
          </div>

          <!-- Account management -->

          <div class="block">
            <WikiCardPrimary headerBorder>
              <template v-slot:header>
                <div class="card-header-title px-0">
                  <WikiHeaderPrimary :size="3" :semantic="1"
                    >Account Management</WikiHeaderPrimary
                  >
                </div>
                <!-- <br />
              <p class="size-6 subtitle">Control your WikiProfile Account</p> -->
              </template>

              <template v-slot:content>
                <div class="is-flex is-flex-direction-column">
                  <b-collapse :open="false" class="item">
                    <template v-slot:trigger>
                      <div
                        class="
                          is-flex
                          is-justify-content-space-between
                          is-align-items-center
                        "
                      >
                        <div class="item-description">
                          <p class="has-text-weight-medium mb-1">
                            Merge account
                          </p>
                          <p class="has-text-grey">
                            Transfer your connections from a duplicate account,
                            then close it
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
                    class="
                      item
                      is-flex
                      is-justify-content-space-between
                      is-align-items-center
                    "
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
                      <b-switch
                        class="mr-0"
                        @input.capture="handleHibernate"
                        v-model="hibernating_enabled"
                      ></b-switch>
                    </div>
                  </div>

                  <div
                    class="
                      item
                      is-flex
                      is-justify-content-space-between
                      is-align-items-center
                    "
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

            <!-- Delete anything prompt -->

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
                      class="
                        modal-actions
                        is-flex is-justify-content-space-between
                      "
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

          <!-- Account access  -->

          <div class="block">
            <WikiCardPrimary headerBorder>
              <template v-slot:header>
                <div class="card-header-title px-0">
                  <WikiHeaderPrimary :size="3" :semantic="1">
                    Account Access
                  </WikiHeaderPrimary>
                </div>
              </template>

              <template v-slot:content>
                <div class="is-flex is-flex-direction-column">
                  <b-collapse class="item" :open="false">
                    <template v-slot:trigger>
                      <div
                        class="
                          is-flex
                          is-justify-content-space-between
                          is-align-items-center
                        "
                      >
                        <div class="item-description">
                          <p class="has-text-weight-medium mb-1">
                            Email address
                          </p>
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
                    </template>
                    <b-field label="Change email">
                      <b-input type="email"></b-input>
                    </b-field>
                  </b-collapse>

                  <b-collapse class="item" :open="false">
                    <template v-slot:trigger>
                      <div
                        class="
                          item
                          is-flex
                          is-justify-content-space-between
                          is-align-items-center
                        "
                      >
                        <div class="item-description">
                          <p class="has-text-weight-medium mb-1">
                            Change password
                          </p>
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
                    </template>
                    <form>
                      <b-field label="Type in your old password">
                        <b-input type="password" v-model="opwd"></b-input>
                      </b-field>
                      <b-field label="Create a new password">
                        <b-input type="password" v-model="npwd"></b-input>
                      </b-field>
                    </form>
                  </b-collapse>

                  <b-collapse class="item" :open="false">
                    <template v-slot:trigger>
                      <div
                        class="
                          item
                          is-flex
                          is-justify-content-space-between
                          is-align-items-center
                        "
                      >
                        <div class="item-description">
                          <p class="has-text-weight-medium mb-1">
                            Phone number
                          </p>
                          <p class="has-text-grey">
                            Add a phone number in case you have trouble signing
                            in
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
                    <div>
                      <b-field label="Change phone number">
                        <b-input
                          type="phone"
                          :value="$auth.user.phone_number"
                          @input="handleInput('phone_number', $event)"
                        ></b-input>
                      </b-field>
                    </div>
                  </b-collapse>
                  <div
                    class="
                      item
                      is-flex
                      is-justify-content-space-between
                      is-align-items-center
                    "
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
                      <b-switch
                        class="mr-0"
                        @input.capture="handle2FA"
                        v-model="tfa_enabled"
                      ></b-switch>
                    </div>
                  </div>
                </div>
              </template>
            </WikiCardPrimary>
            <!-- <div class="column is-4"></div> -->
          </div>
          <WikiCardPrimary headerBorder v-if="hasUpdated">
            <template v-slot:header>Save account changes</template>
            <template v-slot:content>
              <div class="persist-button-wrapper container">
                <WikiButtonBased @click="discardChanges" :type="'is-danger'"
                  >Discard changes</WikiButtonBased
                >
                <WikiButtonBased
                  @click="pushUpdatedProfile"
                  :type="'is-success'"
                  >Persist changes</WikiButtonBased
                >
              </div>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
    </div>

    <div
      v-show="hasUpdated"
      class="is-rounded-confirmbutton"
      @click="pushUpdatedProfile"
    >
      <b-icon icon="checkmark" size="is-large">ABC</b-icon>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "currentAccount",

  data() {
    return {
      id: this.$route.params.accountID,
      account: this.$auth.user,
      changeDelta: {},
      expandedDelta: {},
      opwd: "",
      npwd: "",
      tfa_enabled: false,
      hibernating_enabled: false,
      confirmDelete: "",
      deletePromptActive: false,
      loading: false,
    };
  },

  computed: {
    hasConfirmed() {
      return this.confirmDelete.toLowerCase() === "i understand";
    },
    hasUpdated() {
      console.log(this.changeDelta);
      console.log(Object.keys(this.changeDelta));
      return (
        Object.keys(this.changeDelta).length > 0 ||
        (this.opwd !== "" && this.npwd !== "")
      );
    },
    hasExpanded(where) {
      return this.expandedDelta[where];
    },
  },

  methods: {
    handleHibernate() {
      const is_hibernating = this.$auth.user.status === "Archived";
      this.$buefy.dialog.confirm({
        title: "Hibernating account",
        message: `Are u sure u want to ${
          is_hibernating ? "hibernate" : "unhibernate"
        } this will make your account ${
          is_hibernating ? "" : "not"
        } visible to the`,
        confirmText: is_hibernating ? "Unhibernate" : "Hibernate",
        type: is_hibernating ? "is-success" : "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$directus.users
            .update(this.$auth.user.id, {
              status: is_hibernating ? "active" : "archived",
            })
            .then((e) => {
              if (!is_hibernating) {
                this.hibernating_enabled = true;
                this.$router.redirect("/");
              }
              this.hibernating_enabled = false;
              this.$buefy.toast
                .open({
                  title: "Hibernate account",
                  type: is_hibernating ? "is-success" : "is-danger",
                  message: `Your account is ${
                    is_hibernating ? "no longer" : ""
                  } hibernating now.`,
                })
                .catch((e) => {
                  this.$buefy.toast.open({
                    type: "is-danger",
                    message: "Server error response, account was not changed.",
                  });
                });
            });
        },
      });
      this.hibernating_enabled = false;
    },

    async handleInput(where, what) {
      await this.$set(this.changeDelta, where, what);
    },
    async handleExpand(where) {
      await this.$set(
        this.expandedDelta,
        where,
        where != undefined ? true : false
      );
    },

    async handlePhotoUpload(form) {
      await this.attemptCompleteRegistration();
    },
    async handle2FA(e) {
      // endpoint is 404'ing, park it for now.
      try {
        await this.$directus.users.tfa.enable(this.account.email);
        await this.$store.dispatch("user/updateUser", {});
        this.tfa_enabled = true;
      } catch (error) {
        this.tfa_enabled = false;
        console.log(error);
        this.$buefy.toast.open({
          type: "is-danger",
          position: "is-bottom",
          message: "error: " + error,
        });
      }
    },

    async pushUpdatedProfile() {
      Object.keys(this.changeDelta).forEach((deltaKey) => {
        if (
          deltaKey in Object.keys(this.account) &&
          (this.account[deltaKey] != undefined ||
            this.account[deltaKey] != null)
        ) {
          this.$set(this.account, deltaKey, this.changeDelta[deltaKey]);
        }
      });
      this.$store.dispatch("user/updateUser", this.changeDelta)
        .then((e) => {
          this.discardChanges();
          // this.$router.go();
        })
        .catch((e) => {
          this.$router.redirect("/login");
        });
    },

    async attemptDeleteAccount() {
      (await this.$store.dispatch("user/deleteUser", this.id))
        ? this.$router.push("/login")
        : {};
    },

    async discardChanges() {
      this.changeDelta = Object.assign({}, this.changeDelta, {});
      this.opwd = "";
      this.npwd = "";
      this.confirmDelete = "";
    },
  },

  async created() {
    this.user = { ...this.$auth.user };
  },
};
</script>

<style lang="scss" scoped>
.is-rounded-confirmbutton {
  height: 64px;
  width: 64px;
  position: fixed;
  bottom: 15px;
  right: 15px;
}

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

.persist-button-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 0;
}
</style>
