<template>
  <WikiCardPrimary borderless>
    <template v-slot:header>
      <div class="list-header" v-if="!headerless">
        <div class="is-flex is-justify-content-space-between">
          <WikiHeaderPrimary class="has-text-grey" :size="2" :semantic="3">
            Showing {{ !$device.isMobile ? "a total of" : "" }}
            {{ companies.length }}
            {{ companies.length !== 1 ? "companies" : "company" }}
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
      <div class="companies-list" v-if="companies.length > 0">
        <div class="companies">
          <WikiCompanyCard
            v-for="(item, i) in companies"
            :key="i"
            :company="item"
          />
        </div>
      </div>
      <div
        v-else
        class="is-flex is-align-items-center is-justify-content-center"
      >
        <WikiHeaderPrimary :size="3" :semantic="3"
          ><p>No companies found :/</p></WikiHeaderPrimary
        >
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

    headerless: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  // computed: {
  //   companiesData() {
  //     return this.companies.map((item) => item.content);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.list-header {
  width: 100%;
}

.companies {
  @include mobile {
    display: flex;
    flex-flow: column nowrap;
  }

  @include desktop {
    padding: 0rem 0.25rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    grid-gap: 0.5rem;
    max-height: 125vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .company {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    padding: 0.5rem 0.25rem;
  }
}

@include desktop {
  /* Hide scrollbar for IE, Edge and Firefox */
  .companies::-webkit-scrollbar {
    display: none;
  }
}
</style>