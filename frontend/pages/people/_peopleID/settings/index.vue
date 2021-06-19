<template>
  <div class="person-settings-page is-fluid">
    <div class="tile container is-parent is-vertical is-12" v-if="!loading">
      <div class="tile block is-12">
        <WikiCardPrimary class="tile is-child">
          <template v-slot:header>
            <div class="wrapper is-flex is-flex-direction-column">
              <div class="card-header-title">
                <WikiHeaderPrimary id="header" :semantic="6" :size="4">
                  <span v-if="person.first_name"> 
                    {{ person.first_name }} {{ person.last_name }} 
                  </span>
                  <span v-else>
                    {{ person.data_full_name }}
                  </span>
                </WikiHeaderPrimary>
                <b-tag class="ml-3" type="is-success is-light">
                  <span class="is-uppercase">{{ person.status }}</span>
                </b-tag>
              </div>
              <WikiHeaderPrimary class="pl-4" :semantic="5" :size="2" gray>
                {{ person.data_title }}
              </WikiHeaderPrimary>
            </div>
          </template>
          <template v-slot:content>
            <WikiTextMultiLine gray :size="0.33" :weight="0.45">
              {{ person.location ? person.location : "" }}
              <span v-if="person.location"></span>
            </WikiTextMultiLine>
            <div class="actions">
              <div
                class="profile-interactions mt-3 is-flex is-justify-content-space-between"
              >
                <b-button class="is-link is-light" @click="attemptUpdatePerson">
                  <p
                    class="is-uppercase has-text-centered has-text-weight-medium"
                  >
                    <WikiIconWicon class="mr-1" icon="sync"></WikiIconWicon>
                    Update Profile
                  </p>
                </b-button>

                <b-button class="is-link is-light">
                  <p
                    class="is-uppercase has-text-centered has-text-weight-medium"
                  >
                    <WikiIconWicon class="mr-1" icon="download"></WikiIconWicon>
                    Download PDF
                  </p>
                </b-button>

                <b-button class="is-link is-light">
                  <p
                    class="is-uppercase has-text-centered has-text-weight-medium"
                  >
                    <WikiIconWicon
                      class="mr-1"
                      icon="cog-outline"
                    ></WikiIconWicon>
                    Manage Settings
                  </p>
                </b-button>
              </div>
            </div>
          </template>
          <!-- <template v-slot:footer>
            <div class="card-footer">
              <WikiButton type="is-link'" outlined size="medium"
                >Update Profile Picture</WikiButton
              >
            </div>
          </template> -->
        </WikiCardPrimary>
      </div>

      <div class="tile is-12 block">
        <WikiCardPrimary class="tile is-child">
          <template v-slot:header>
            <div
              class="card-header-title"
              style="border-bottom: 2px solid lightgray; width: 100%"
            >
              <span>
                <WikiHeaderPrimary id="header" :semantic="1" :size="4">
                  Profile Information
                </WikiHeaderPrimary>
                <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
                  Basic information association with your profile
                </WikiHeaderPrimary>
              </span>
            </div>
          </template>
          <template v-slot:content>
            <WikiPersonFormsProfile :person="me" @input="updateFields" />
          </template>
        </WikiCardPrimary>
      </div>

      <div class="tile block is-12">
        <WikiCardPrimary class="tile is-child">
          <template v-slot:header>
            <div
              class="card-header-title"
              style="border-bottom: 2px solid lightgray; width: 100%"
            >
              <span>
                <WikiHeaderPrimary id="header" :semantic="1" :size="4"
                  >Account management</WikiHeaderPrimary
                >
                <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
                  Control your Wikiprofile account
                </WikiHeaderPrimary>
              </span>
            </div>
          </template>
          <template v-slot:content>
            <WikiPersonFormsAccountManagement
              @input="updateFields"
              @merge="attemptMergeEmail"
            />
          </template>
        </WikiCardPrimary>
      </div>

      <div class="tile block is-12">
        <WikiCardPrimary class="tile is-child">
          <template v-slot:header>
            <div
              class="card-header-title"
              style="border-bottom: 2px solid lightgray; width: 100%"
            >
              <span>
                <WikiHeaderPrimary id="header" :semantic="1" :size="4"
                  >Account Access</WikiHeaderPrimary
                >
                <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
                  Settings to help you keep your account secure
                </WikiHeaderPrimary>
              </span>
            </div>
          </template>
          <template v-slot:content>
            <WikiPersonFormsAccountAccess :id="personId" @input="updateMe" />
          </template>
        </WikiCardPrimary>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonSettingsPage",

  middleware: ["auth", "currentAccount"],
  
  data() {
    return {
      me: {},
      fields: {},
      canEdit: false,
      loading: true,
      personId: this.$route.params.peopleID,
    };
  },

  async created() {
    try {
      await this.$store.dispatch("people/fetchMe", this.personId);
      if (
        this.$auth.user !== null &&
        this.$auth.user.id !== null &&
        this.person.claimed_by_user_account !== null &&
        this.$auth.user.id === this.person.claimed_by_user_account
      ) {
        this.canEdit = true;
      }
    } catch (error) {
      console.error(error);
      this.$router.push("/404");
    }
    this.me = this.person;
    this.loading = false;
  },

  computed: {
    person() {
      return this.$store.getters["people/getMe"];
    },
  },

  methods: {
    updateMe(form) {
      this.me = { ...this.me, ...form };
    },

    updateFields(form) {
      this.fields = { ...this.fields, ...form };
    },

    async attemptUpdatePerson() {
      this.$store.commit("people/setFields", this.fields);
      await this.$store.dispatch("people/updateMe");
    },

    attemptMergeEmail(form) {
      console.log("merging email:", form);
    },
  },

  mounted() {
    this.me = this.person;
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
