<template>
  <WikiCardFeatured class="featured-company-card">
    <template v-slot:header>
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
        <a class="company-website" :href="company.url">{{ company.url }}</a>
      </div>
    </template>

    <template v-slot:content>
      <p class="has-text-grey company-headquarters">
        {{ company.headquarters }}
      </p>
      <WikiTextCollapsible :fullText="company.description" :charLimit="150" />
    </template>

    <template v-slot:footer>
      <WikiProfileTag :tag="company.industry" />
    </template>

    <template v-slot:action>
      <WikiButtonBased
        outlined
        squared
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
};
</script>

<style lang="scss" scoped>
</style>