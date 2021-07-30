<template>
  <div class="person-search-page">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child">
          <WikiCardPrimary class="container">
            <template v-slot:header>
              <div class="card-header-title">
                <WikiHeaderPrimary :semantic="1" :size="4"
                  >Who are you looking for?</WikiHeaderPrimary
                >
              </div>
            </template>
            <template v-slot:content>
              <b-field>
                <b-field expanded>
                  <b-input
                    @input="searchForPeople"
                    @keyup.enter="searchForPeople"
                    placeholder="search by name..."
                    v-model="search"
                    rounded
                    expanded
                    icon="account-outline"
                  />
                  <p class="control">
                    <WikiButton @click="searchForPeople" rounded
                      ><span>Search</span></WikiButton
                    >
                  </p>
                </b-field>
              </b-field>
              <div class="loading" v-if="loading">
                <b-progress class="my-2" :type="'is-success'"></b-progress>
              </div>
              <div v-else>
                <div
                  class="no-results-placeholder"
                  v-if="paginatedProfiles.length === 0 && search.length > 0"
                >
                  <WikiHeaderPrimary :size="3" :semantic="3"
                    >No people found matching your search, try another
                    term...</WikiHeaderPrimary
                  >
                </div>
                <div class="wrapper" v-else>
                  <div class="tile is-child">
                    <WikiHeaderPrimary
                      :size="3"
                      :semantic="3"
                      v-if="!hasSearched"
                      >Featured profiles include</WikiHeaderPrimary
                    >
                    <WikiPersonFeaturedList
                      v-if="!hasSearched"
                      :people="filteredPeople"
                      class="container"
                    />
                    <WikiPersonList
                      v-else
                      :profiles="paginatedProfiles"
                      class="block container"
                      headerless
                    />
                  </div>
                  <div class="tile is-child">
                    <b-pagination
                      v-if="paginatedProfiles.length > perPage"
                      :total="total"
                      :order="'is-centered'"
                      v-model="current"
                      :per-page="perPage"
                    />
                  </div>
                </div>
              </div>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
      <!-- <WikiListPaginated :items="profiles">
            <template v-slot:list>
              <WikiPersonList :profiles="paginatedProfiles" class="block" />
            </template>
          </WikiListPaginated> -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "PeoplePage",

  data() {
    return {
      search: "",
      current: 1,
      perPage: 5,
      loading: false,
      hasTyped: false,
    };
  },

  computed: {
    people() {
      if (!this.hasSearched) {
        return this.$store.getters["people/getFeaturedPeople"];
      } else {
        return this.$store.getters["people/getPeople"];
      }
    },

    filteredPeople() {
      //TODO:
      return this.people;
    },

    hasSearched() {
      return (
        (this.search.length > 0 ||
          this.$store.getters["search/getQuery"].length > 0) &&
        this.hasTyped
      );
    },

    total() {
      return this.people.length;
    },

    paginatedProfiles() {
      const pageNumber = this.current - 1;
      return this.people.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },
  },

  methods: {
    searchForPeople: async function () {
      this.loading = true;
      this.hasTyped = true;
      await this.$store.dispatch("people/fetchPeople", { search: this.search });
      this.loading = false;
    },
  },

  async created() {
    this.searchForPeople = _.debounce(this.searchForPeople, 300);
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $primary-slate-gray;
}
</style>
