<template>
  <WikiCardPrimary class="featured-company-card">
    <template v-slot:header>
      <div class="card-header-icon">
        <img
          :src="company.company_logo"
          :alt="`${company.company_name} logo`"
          class="company-logo"
        />
      </div>
    </template>
    <template v-slot:content>
      <div
        class="is-flex is-align-items-center is-justify-content-space-between"
      >
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

        <WikiButtonBased
          outlined
          squared
          type="is-success is-light"
          class="follow-button"
        >
          <span class="is-uppercase">follow</span>
        </WikiButtonBased>
      </div>
      <p class="has-text-grey pt-5 pb-2">
        {{ company.headquarters }}
      </p>
      <WikiTextCollapsible :fullText="company.description" :charLimit="150" />

      <div class="py-3">
        <span class="company-industry-tag">{{ company.industry }}</span>
      </div>
    </template>
  </WikiCardPrimary>
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
.company-logo {
  @include mobile {
    max-height: 85px;
  }
  
  @include desktop {
    max-height: 45px;
    max-width: 300px;
  }
}

.company-industry-tag {
  background-color: aliceblue;
  color: royalblue;
  padding: 0.5rem 1rem;
}

.company-website {
  @include mobile {
    display: none;
  }
}

.featured-company-card {
  @include desktop {
    min-height: 425px;
  }
}
</style>