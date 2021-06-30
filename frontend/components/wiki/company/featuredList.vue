<template>
  <WikiCardPrimary borderless>
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
          <!-- <nuxt-link
            class="featured-company"
            v-for="(item, i) in companies"
            :key="i"
            :to="`/companies/${item.company_name}`"
          >
            <WikiCompanyFeaturedCard  v-for="(item, i) in companies"
            :key="i" :company="item" />
          </nuxt-link> -->
          
          <WikiCompanyFeaturedCard  v-for="(item, i) in companies"
            :key="i" :company="item" />
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
    padding: 0rem 0.25rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    max-height: 125vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  // .featured-company {
  //   max-width: 100%;
  //   padding: 0.5rem 0.25rem;
  // }
}

@include desktop {
  /* Hide scrollbar for IE, Edge and Firefox */
  .featured-companies::-webkit-scrollbar {
    display: none;
  }
}
</style>