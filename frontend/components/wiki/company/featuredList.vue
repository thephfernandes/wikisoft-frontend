<template>
  <WikiCardPrimary>
    <template v-slot:content>
      <div class="featured-companies-list block">
        <div class="list-header">
          <div class="is-flex is-justify-content-space-between">
            <WikiHeaderPrimary class="has-text-grey" :size="2" :semantic="3">
              Showing a total of {{ companies.length }} companies
            </WikiHeaderPrimary>
            <div class="show-all-link">
              <WikiHeaderPrimary :size="2" :semantic="3">
                <nuxt-link to="/companies">Show all</nuxt-link>
              </WikiHeaderPrimary>
            </div>
          </div>
        </div>
        <div class="featured-companies">
          <div class="featured-company" v-for="(item, i) in companies" :key="i">
            <WikiCompanyFeaturedCard :company="item" />
          </div>
        </div>
      </div>
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {
  props: {
    companies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list-header {
  padding: 0.5em;
}

.featured-companies {
  display: grid;

  @include mobile {
    grid-template-columns: auto;
  }

  @include desktop {
    grid-template-columns: auto auto;
  }
}
</style>