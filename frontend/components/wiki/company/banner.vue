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
            <img class="company_logo" :src="photoSrc" />
          </div>
          <div class="header-name-actions" style="width: 100%">
            <WikiHeaderPrimary class="company-name" :size="4" :semantic="2">
              {{ company.name ? company.name : company.company_name }}
            </WikiHeaderPrimary>
            <div class="actions is-flex is-align-items-center">
              <div class="settings-button" v-if="companyClaimedByAccount">
                <a :href="`/companies/${this.id}/settings`">
                  <WikiIconWicon icon="cog-outline" size="is-medium" />
                </a>
              </div>
              <!-- TODO: remember to add v-if="$auth.user && !companyClaimedByAccount" -->
              <WikiCompanyClaim />
              <WikiButtonBased
                  outlined
                  @click="$emit('toggleFollow')"
                  class="follow-button"
                  :type="isFollowing ? 'is-success' : 'is-success is-light'"
                  size="is-small"
                >
                  <span class="is-size-7-mobile is-uppercase has-text-weight-semibold">
                    {{ isFollowing ? "unfollow" : "follow" }}
                  </span>
                </WikiButtonBased>

                <WikiButtonBased
                  @click="$emit('redirectAddReview')"
                  class="add-review-button"
                  type="is-primary"
                  size="is-small"
                >
                  <div class="button-content is-flex is-align-items-center">
                    <WikiIconWicon icon="plus" size="is-medium" />
                    <span class="is-size-7-mobile is-uppercase has-text-weight-semibold">
                      add a review
                    </span>
                  </div>
                </WikiButtonBased>
              <!-- <div class="action-buttons">
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

                <WikiButtonBased
                  @click="$emit('redirectAddReview')"
                  class="add-review-button"
                  type="is-primary"
                  size="is-small"
                >
                  <div class="button-content is-flex is-align-items-center">
                    <WikiIconWicon icon="plus" size="is-medium" />
                    <span class="is-uppercase has-text-weight-semibold">
                      add a review
                    </span>
                  </div>
                </WikiButtonBased>
              </div> -->
            </div>
          </div>
        </div>
        <WikiCompanyProfileStats class="company-profile-stats" :id="id" />
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
      return this.company.photo
        ? `http://io.wikiprofile.com/assets/${this.company.photo}`
        : "/_nuxt/frontend/assets/logos/wikiprofile/wikiprofile-logo-icon.svg";
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
  border-radius: 0.6rem;
  border: 1px solid lightgrey;
  box-shadow: none;
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
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    grid-area: bannerpicture;
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  .company-banner-content {
    position: relative;
    grid-area: bannercontent;

    .banner-header {
      position: relative;

      @include desktop {
        width: 100%;
        display: flex;
        transform: translateY(-20%);
      }

      .header-name-actions {
        @include desktop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .company-name {
          @include mobile {
            position: absolute;
            top: 0;
            left: 70px;
          }
          
          @include desktop {
            margin-left: 1.5rem;
          }
        }

        .actions > :not(:last-child) {
          @include mobile {
            margin-right: 0.3rem;
          }

          @include desktop {
            margin-right: 0.75rem;
          }
        }
      }
    }
  }
}

.company-logo-wrapper {
  transform: translateY(-30%);
  border: 1px solid rgba($primary-light-gray, 50%);
  border-radius: 0.5em;
  background: white;
  padding: 0.2em;

  @include mobile {
    transform: translateY(-40%);
    max-height: 55px;
    max-width: 55px;
  }

  @include tablet {
    max-height: 75px;
    max-width: 75px;
  }

  @include desktop {
    max-height: 95px;
    max-width: 95px;
  }
}

.company_titlelogo {
  grid-area: logotitle;
  position: relative;
}

.company-profile-stats {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
