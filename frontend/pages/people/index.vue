<template>
  <div class="person-search-page">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child">
          <WikiCardPrimary>
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
                    @input="emitSearchForPeople"
                    placeholder="search by name..."
                    v-model="search"
                    rounded
                    expanded
                  />
                  <p class="control">
                    <WikiButton @click="searchForPeople" rounded
                      ><span>Search</span></WikiButton
                    >
                  </p>
                </b-field>
              </b-field>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
      <!-- <WikiListPaginated :items="profiles">
            <template v-slot:list>
              <WikiPersonList :profiles="paginatedProfiles" class="block" />
            </template>
          </WikiListPaginated> -->
      <div class="tile container is-12 is-parent is-vertical">
        <div class="loading" v-if="loading">
          <b-progress
            class="my-2"
            :value="60"
            :type="'is-success'"
          ></b-progress>
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
              <WikiPersonList
                v-if="paginatedProfiles.length > 0"
                :profiles="paginatedProfiles"
                class="block"
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
      </div>
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
    };
  },

  computed: {
    people() {
      return this.$store.getters["people/getPeople"];
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
      this.loading = false;
      await this.$store.dispatch("people/fetchPeople", { search: this.search });
      this.loading = true;
    },

    emitSearchForPeople: async function () {
      await this.searchForPeople();
    },
  },

  async created() {
    this.emitSearchForPeople = _.debounce(this.searchForPeople, 300);
  },
};
</script>
