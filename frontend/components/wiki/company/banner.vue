<template>
  <div class="block">
    <div class="card company_banner_container">
      <div class="coverpicture_container">
        <img
          class="company_coverpicture"
          v-if="company.thumbnail !== undefined"
          :src="thumbnailSrc"
        />
        <img
          class="company_coverpicture"
          v-if="company.thumbnail === undefined"
          src="../../../assets/unsplash/empty_office_640x426.jpg"
        />
      </div>
      <div
        class="company-profile-banner-items is-flex is-justify-content-space-between px-3"
      >
        <div class="company_titlelogo is-flex">
          <div class="logo-wrapper">
            <b-image
              v-show="company.photo != undefined"
              :src="photoSrc"
              class="company-logo"
              rounded
              style="border: 1px solid lightgrey"
            ></b-image>
          </div>
          <!-- <img
          class="company_logo"
          v-show="company.photo != undefined"
          :src="photoSrc"
        /> -->
          <img
            class="company_logo"
            v-show="company.photo === undefined"
            src="../../../assets/logos/wikiprofile/wikiprofile-logo-icon.svg"
          />
          <WikiHeaderPrimary class="ml-2" :size="4" :semantic="2">
            {{ company.name || company.company_name }}
          </WikiHeaderPrimary>
          <!-- <h1>{{ company.name ? company.name : "default" }}</h1> -->
        </div>
        <!-- <div class="company_whitespace"></div> -->
        <div class="action-buttons is-flex is-align-items-center">
          <div class="settings-button" v-if="companyClaimedByAccount">
            <a :href="`/companies/${this.id}/settings`">
              <WikiIconWicon icon="cog-outline" size="is-medium" />
            </a>
          </div>
          <div class="your-company-prompt mr-4">
            <b-dropdown position="is-bottom-left" v-if="$auth.user && !companyClaimedByAccount">
              <template v-slot:trigger>
                <a role="button">
                  <span>Is this your company?</span>
                </a>
              </template>
              <b-dropdown-item custom>
                <b-message type="is-info">
                  <p><a role="button" @click="attemptCompanyClaim">Claim it now!</a></p>
                </b-message>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <!-- <WikiProfileClaim /> -->
          <b-button
          outlined
            @click="isFollowing = !isFollowing" class="follow-button"
            :type="isFollowing ? 'is-success' : 'is-success is-light'"
          >
            <span class="is-uppercase">
              {{ isFollowing ? "Unfollow" : "Follow" }}
            </span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiCompanyBanner",

  props: {
    company: {
      type: Object,
      default: {},
      required: true,
    },
  },

  data() {
    return {
      isFollowing: false,
      displayClaimMessage: false,
      id: this.$route.params.companyID,
    };
  },

  computed: {
    thumbnailSrc() {
      return `http://io.wikiprofile.com/assets/${this.company.thumbnail}`;
    },

    photoSrc() {
      return `http://io.wikiprofile.com/assets/${this.company.photo}`;
    },

    companyClaimedByAccount() {
      return this.$store.getters["companies/getClaimedCompanies"].find(item => item.company_id === this.id);
    }
  },

  methods: {
    async attemptCompanyClaim() {
      if (this.$auth.user) {
        await this.$store.dispatch("companies/claimCompany", this.company.company_id);
      } else {
        this.$router.push("/login");
      }
    }
  },

  async created() {
    // await this.$store.dispatch("companies/fetchClaimedCompanies");
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.6em;
  border: 1px solid lightgrey;
  box-shadow: none;

  .card-header {
    box-shadow: none;
  }

  .card-content {
    padding-top: 0.5rem;
  }

  .card-footer {
    border-top: none;
  }
}

.settings-button {
  position: absolute;
  right: 1em;
  top: 1em;
}
// .company_banner_container {
//   display: grid;
//   width: 100%;
//   height: auto;
//   grid-template-columns: 15px auto 1fr auto 15px;
//   grid-template-rows: auto 52px 1fr;
//   grid-template-areas:
//     "banner banner banner banner banner"
//     "whitespace logotitle whitespace2 actionbuttons whitespace3";
// }
.company_coverpicture {
  border-top-left-radius: 0.6em;
  border-top-right-radius: 0.6em;
  grid-area: banner;
  width: 100%;
  height: 160px;
  @include tablet {
    height: 240px;
  }
  @include mobile {
    height: 360px;
  }
  object-fit: cover;
}
.coverpicture_container {
  grid-area: banner;
}

.company-logo {
  background: white;
  border-radius: 100%;
  max-height: 65px;
  max-width: 65px;
}

.logo-wrapper {
  transform: translateY(-55%);
}

.company_logo, .company-logo {
  position: absolute;
  z-index: 1;
  left: -8px;
  bottom: 32px;
  height: 64px;
  width: 64px;
}

.company_titlelogo {
  grid-area: logotitle;
  position: relative;
  h1 {
    font-size: 28px;
    font-weight: 700;
    // margin-left: 52px;
    max-height: 48px;
    text-overflow: ellipsis;
  }
}
.company_whitespace {
  grid-area: whitespace2;
}
.action-buttons {
  margin-bottom: auto;
  grid-area: actionbuttons;
}

.follow-button {
  border-radius: 0.1em;
}
</style>
