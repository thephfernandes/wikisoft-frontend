<template>
  <WikiCardFeatured class="featured-company-card">
    <template v-slot:header>
      <a @click="redirectToCompanyProfile()">
        <div class="card-header-icon">
          <img
            :src="company.company_logo"
            :alt="`${company.company_name} logo`"
            class="company-logo"
          />
        </div>
        <div>
          <div
            class="
              card-header-title
              px-0
              py-0
              is-flex-direction-column is-align-items-flex-start
            "
          >
            <WikiHeaderPrimary :size="3" :semantic="3">
              {{ company.company_name }}
            </WikiHeaderPrimary>
          </div>
        </div>
      </a>
      <a class="company-website" :href="company.url">{{ publicWebsite }}</a>
    </template>

    <template v-slot:content>
      <p class="has-text-grey company-headquarters">
        {{ company.headquarters }}
      </p>
      <WikiTextCollapsible v-if="company.description" :fullText="company.description" :charLimit="150" />
    </template>

    <template v-slot:footer>
      <WikiProfileTag v-if="company.industry || company.data_industry" :tag="company.industry || company.data_industry" />
    </template>

    <template v-slot:action>
      <WikiButtonBased
        outlined
        squared
        :size="$device.isMobile ? 'is-small' : ''"
        type="is-success is-light"
        class="follow-button"
      >
        <span class="is-uppercase">follow</span>
      </WikiButtonBased>
    </template>
  </WikiCardFeatured>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true,
    },
  },

  computed: {
    publicWebsite() {
      if (!this.company.url) {
        return;
      }

      if (this.company.url?.includes('https://')) {
        return this.company.url.slice(12, this.company.url.length);
      } else {
        return this.company.url.slice(11, this.company.url.length);
      }
    }
  },

  methods: {
    redirectToCompanyProfile() {
      this.$store.commit("companies/setIsFeatured", true);
      this.$router.push(`/companies/${this.company.company_name}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.company-logo {
  max-height: 45px;
}
</style>