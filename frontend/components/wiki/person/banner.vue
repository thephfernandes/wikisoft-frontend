<template>
  <WikiCardPrimary contentOnly class="profile-banner block" style="wisth: 100%;">
    <template v-slot:content>
      <div
        class="header-wrapper is-flex is-justify-content-space-between"
        style="width: 100%"
      >
        <div class="photo-name-wrapper is-flex-direction-column">
          <div class="card-header-icon pl-0">
            <figure class="image is-128x128">
              <img
                class="profile-image is-rounded"
                :src="
                  imageSrc || 'https://bulma.io/images/placeholders/128x128.png'
                "
                alt="profile picture"
              />
            </figure>
          </div>
        </div>
        <div class="profile-actions is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly">
          <b-button
            outlined
            class="is-link is-light report-button"
            @click="reportModalActive = true"
          >
            <div class="button-content is-flex is-align-items-center">
              <WikiIconWicon icon="flag" />
              <span class="is-uppercase">report</span>
            </div>
          </b-button>
          <div class="claim-wrapper">
            <b-dropdown position="is-bottom-left">
              <template v-slot:trigger>
                <a role="button" class="is-flex is-align-items-center">
                  <div class="claim-icon"></div>
                  <p
                    class="
                      py-2
                      has-text-grey has-text-centered has-text-weight-semibold
                    "
                  >
                    Is this you?
                  </p>
                </a>
              </template>

              <b-dropdown-item custom>
                <b-message type="is-info">
                  <p>
                    If you think this person matches your profile, you can claim
                    it. By claiming this profile you won't be able to make
                    others profiles with your email.
                    <a role="button" @click="attemptPersonProfileClaim"
                      >I understand</a
                    >.
                  </p>
                </b-message>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
      <div class="is-flex is-flex-direction-column">
        <div class="card-header-title pl-0 pb-0">
          <p class="is-size-4">
            {{ fullName }}
          </p>
        </div>
        <div class="wrapper" v-if="!isFeatured">
          <p class="has-text-grey">{{ person.data_title }}</p>
          <p class="has-text-grey">{{ person.data_location }}</p>
        </div>
      </div>
      <div class="is-size-5">
        <p class="has-text-grey has-text-weight-semibold" v-if="!isFeatured">
          {{ person.location ? person.location : "" }}
          <span class="wrapper">
            <span v-if="person.location">·</span>
            <a v-if="person.data_number_of_connections"
              href="
          "
              >{{
                person.data_number_of_connections > 500
                  ? "500+"
                  : person.data_number_of_connections
              }}
              connections</a
            >
            <span v-if="person.data_number_of_connections">·</span>
            <a v-if="person.contact_info" href=""><span>Contact Info</span></a>
          </span>
        </p>
        <p class="has-text-grey has-text-weight-semibold" v-else>
          Founder of <a :href="person.company_website">{{ person.founder_of }}</a> · {{ person.location }}
        </p>
      </div>

      <!-- <div
          class="pt-5 profile-interactions is-flex is-justify-content-space-between"
          style="width: 100%"
        >
          <b-button
            class="is-link is-light py-3"
            v-for="(item, i) in interactions"
            :key="i"
          >
            <p
              class="is-uppercase is-size-5 has-text-centered has-text-weight-medium"
            >
              {{ item }}
            </p>
          </b-button>
        </div> -->
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: {},
      required: true,
    },
  },

  data() {
    return {
      isFollowing: false,
      id: this.$route.params.personID,
    };
  },

  computed: {
    isFeatured() {
      return this.$store.getters["people/getIsFeatured"];
    },

    imageSrc() {
      if (this.isFeatured) {
        return this.person.image;
      } else {
        //TODO: directus file asset call
      }
    },

    fullName() {
      return this.person.full_name || this.person.data_full_name || `${this.person.first_name} ${this.person.last_name}`
      
    }
  },

  methods: {
    async attemptPersonProfileClaim() {
      if (this.$auth.user) {
        await this.$store.dispatch("user/claimProfile", this.personId);
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.claim-icon {
  height: 16px;
  width: 16px;
  border-radius: 100%;
  background: rgb(255, 109, 42);
  margin-right: 0.25em;

  @include mobile {
    display: none;
  }
}
</style>