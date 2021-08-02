<template>
  <div class="block">
    <div class="card company-banner is-flex is-flex-direction-column">
      <img
        class="company-banner__coverpicture"
        v-show="company.thumbnail !== undefined"
        :src="thumbnailSrc"
        alt="company banner"
      />
      <img
        class="company-banner__coverpicture"
        v-show="company.thumbnail === undefined"
        src="../../../assets/logos/globe_banner_grey.png"
      />
      <div class="settings-button">
        <a :href="`/companies/${this.id}/settings`">
          <WikiIconWicon icon="cog-outline" size="is-medium" />
        </a>
      </div>
      <div class="company-banner__content">
        <div class="company-banner__logo">
          <div
            class="
              company-logo__wrapper
              is-flex is-align-items-center is-justify-content-center
            "
          >
            <img
              class="company-logo__image"
              :src="
                company.company_logo ||
                `https://io.wikiprofile.com/files/${logoSrc}`
              "
              alt=""
            />
          </div>
        </div>
        <div
          class="
            company-banner__header
            is-flex is-justify-content-space-between
          "
        >
          <WikiHeaderPrimary class="company-name" :size="4" :semantic="2">
            {{ company.name ? company.name : company.company_name }}
          </WikiHeaderPrimary>
          <div
            class="
              company-banner__actions
              is-flex is-align-items-center is-justify-content-space-between
            "
          >
            <WikiCompanyClaim v-if="worksAtCompany" />
            <WikiButtonBased
              outlined
              @click="$emit('toggleFollow')"
              class="follow-button"
              :type="isFollowing ? 'is-success' : 'is-success is-light'"
              size="is-small"
            >
              <span
                class="is-size-7-mobile is-uppercase has-text-weight-semibold"
              >
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
                <span
                  class="is-size-7-mobile is-uppercase has-text-weight-semibold"
                >
                  add a review
                </span>
              </div>
            </WikiButtonBased>
          </div>
        </div>
        <!-- <div class="company-banner__stats">
        <WikiCompanyProfileStats :id="id" />
      </div> -->
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
      logoSrc: "",
    };
  },

  computed: {
    thumbnailSrc() {
      if (this.company.thumbnail) {
        return `http://io.wikiprofile.com/assets/${this.company.thumbnail}`;
      }
    },

    // photoSrc() {
    //   return this.company.photo
    //     ? `http://io.wikiprofile.com/assets/${this.company.photo}`
    //     : "/_nuxt/frontend/assets/logos/wikiprofile/wikiprofile-logo-icon.svg";
    // },

    companyClaimedByAccount() {
      return this.$store.getters["companies/getClaimedCompanies"].find(
        (item) => item.company_id === this.id
      );
    },

    worksAtCompany() {
      if (this.$auth.user) {
        return this.$auth.user.companies.find(
          (item) => item.company_id === this.id
        );
      }
      return false;
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

    //TODO: generate signed urls for image sources because this sucks
    async fetchLogoSrc() {
      if (this.id) {
        try {
          const file = await this.$directus.files.read(
            this.$store.getters["companies/getSelectedCompany"].avatar
          );
          if (file.data) {
            this.logoSrc = file.data.id;
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },

  async created() {
    // await this.$store.dispatch("companies/fetchClaimedCompanies");
    await this.fetchLogoSrc();
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.6rem;
  border: 1px solid lightgrey;
  box-shadow: none;
}

.company-banner {
  position: relative;

  .settings-button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}

.company-banner__coverpicture {
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;

  @include tablet {
    max-height: 125px;
  }
}

.company-banner__content {
  position: relative;

  .company-logo__wrapper {
    position: absolute;
    left: 1rem;
    transform: translateY(-50%);
    border: 1px solid rgba($primary-light-gray, 50%);
    border-radius: 0.6rem;
    background: white;
    padding: 0.2rem;

    @include tablet {
      height: 75px;
      width: 75px;
    }

    .company-logo__image {
      max-height: 100%;
    }
  }

  .company-banner__header {
    width: 100%;
    padding: 0.5rem 1rem;

    @include tablet {
      padding-left: calc(75px + 1.5rem);
    }
  }

  .company-banner__actions > :not(:last-child) {
    @include tablet {
      margin-right: 0.75rem;
    }
  }
}
</style>
