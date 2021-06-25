<template>
  <div class="block">
    <div class="card company_banner_container">
      <div class="coverpicture_container">
        <img
          class="company_coverpicture"
          v-show="company.thumbnail !== undefined"
          :src="thumbnailSrc"
        />
        <img
          class="company_coverpicture"
          v-show="company.thumbnail === undefined"
          src="../../../assets/unsplash/empty_office_640x426.jpg"
        />
      </div>
      <div class="company-banner-content px-3 pb-3">
        <div class="banner-header">
          <div class="company-logo-wrapper">
            <img
              class="company_logo"
              v-show="company.photo !== undefined"
              :src="photoSrc"
            />
            <img
              class="company_logo default"
              v-show="company.photo === undefined"
              src="../../../assets/logos/wikiprofile/wikiprofile-logo-icon.svg"
            />
          </div>
          <div
            class="
              is-flex is-align-items-center is-justify-content-space-between
            "
            style="width: 100%"
          >
            <WikiHeaderPrimary class="ml-2" :size="4" :semantic="2">
              {{ company.name ? company.name : company.company_name }}
            </WikiHeaderPrimary>
            <div class="action-buttons is-flex is-align-items-center">
              <div class="settings-button" v-if="companyClaimedByAccount">
                <a :href="`/companies/${this.id}/settings`">
                  <WikiIconWicon icon="cog-outline" size="is-medium" />
                </a>
              </div>
              <!-- TODO: remember to add v-if="$auth.user && !companyClaimedByAccount" -->
              <WikiCompanyClaim class="mr-3" />
              <WikiButtonBased
                outlined
                @click="$emit('toggleFollow')"
                class="follow-button"
                :type="isFollowing ? 'is-success' : 'is-success is-light'"
                size="is-small"
              >
                <span class="is-uppercase has-text-weight-semibold">
                  {{ isFollowing ? "unfollow" : "follow" }}
                </span>
              </WikiButtonBased>
            </div>
          </div>
        </div>
        <div class="banner-items">
          <WikiCompanyProfileStats :id="this.id" />
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
      return this.$store.getters["companies/getClaimedCompanies"].find(
        (item) => item.company_id === this.id
      );
    },
  },

  methods: {
    async attemptCompanyClaim() {
      if (this.$auth.user) {
        await this.$store.dispatch(
          "companies/claimCompany",
          this.company.company_id
        );
      } else {
        this.$router.push("/login");
      }
    },
  },

  async created() {
    // await this.$store.dispatch("companies/fetchClaimedCompanies");
  },
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

.company_banner_container {
  display: grid;
  width: 100%;
  height: auto;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
  grid-template-areas:
    "bannerpicture"
    "bannercontent";

  @include desktop {
    max-height: 270px;
  }

  .company_coverpicture {
    border-top-left-radius: 0.6em;
    border-top-right-radius: 0.6em;
    grid-area: bannerpicture;
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  .company-banner-content {
    grid-area: bannercontent;

    .banner-header {
      width: 100%;
      display: flex;
      transform: translateY(-20%);
    }
  }
}

.company-logo-wrapper {
  transform: translateY(-30%);
  border: 1px solid rgba($primary-light-gray, 50%);
  border-radius: 0.5em;
  background: white;
  padding: 0.2em;

  @include desktop {
    max-height: 75px;
    max-width: 75px;
  }
}

.company_logo {
  @include mobile {
  }

  @include desktop {
    height: 100%;
    width: 100%;
  }
}

.company_titlelogo {
  grid-area: logotitle;
  position: relative;
  h1 {
    font-size: 28px;
    font-weight: 700;
    max-height: 48px;
    text-overflow: ellipsis;
  }
}
</style>
