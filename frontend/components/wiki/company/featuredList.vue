<template>
  <WikiCardPrimary>
    <template v-slot:header>
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
    </template>

    <template v-slot:content>
      <div class="featured-companies-list">
        <div class="featured-companies">
          <div class="featured-company" v-for="(item, i) in companies" :key="i">
            <nuxt-link :to="`/companies/${item.company_name}`">
              <WikiCompanyFeaturedCard :company="item" />
            </nuxt-link>
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
  width: 100%;
}

.featured-companies {
  @include mobile {
    display: flex;
    flex-flow: column nowrap;
  }

  @include desktop {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    max-height: 125vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .featured-company {
    max-width: 100%;
  }
}

@include desktop {
  /* Hide scrollbar for IE, Edge and Firefox */
  .featured-companies::-webkit-scrollbar {
    display: none;
  }
}
</style>