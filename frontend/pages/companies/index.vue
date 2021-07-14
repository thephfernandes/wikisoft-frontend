<template>
  <div class="company-search-page">
    <div class="tile is-vertical">
        <div class="tile is-vertical">
          <div class="tile is-parent">
            <div class="tile is-child">
              <WikiCardPrimary class="container">
                <template v-slot:header>
                  <div class="card-header-title" style="width: 100%">
                    <WikiHeaderPrimary :semantic="1" :size="4"
                      >What are you looking for?</WikiHeaderPrimary
                    >
                  </div>
                </template>
                <template v-slot:content>
                  <b-field expanded>
                    <b-input
                      placeholder="search for a company"
                      v-model="search"
                      rounded
                      expanded
                      @input="searchForCompanies"
                      @keyup.enter="searchForCompanies"
                    />
                    <b-input
                      placeholder="company industry, banking/retail/etc"
                      v-model="industry"
                      rounded
                      expanded
                      @input="searchForCompanies"
                      @keyup.enter="searchForCompanies"
                    />
                    <p class="control">
                      <WikiButton @click="searchForCompanies" rounded
                        ><span>Search</span></WikiButton
                      >
                    </p>
                  </b-field>
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
                      v-if="
                        paginatedCompanies.length === 0 &&
                        (search.length > 0 || industry.length > 0)
                      "
                    >
                      <WikiHeaderPrimary :size="3" :semantic="3"
                        >No companies found matching your search, try another
                        term...</WikiHeaderPrimary
                      >
                    </div>
                    <div class="wrapper" v-else>
                      <div class="tile is-child">
                        <WikiCompanyFeaturedList
                          :companies="paginatedCompanies"
                          class="container"
                        />
                      </div>
                      <div class="tile is-child">
                        <b-pagination
                          v-if="paginatedCompanies.length > perPage"
                          :total="total"
                          v-model:current="current"
                          :order="'is-centered'"
                          :per-page="perPage"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </WikiCardPrimary>
            </div>
          </div>
          <!-- <div class="tile is-parent is-vertical">
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
                v-if="paginatedCompanies.length === 0 && (search.length > 0 || industry.length > 0)"
              >
                <WikiHeaderPrimary :size="3" :semantic="3"
                  >No companies found matching your search, try another
                  term...</WikiHeaderPrimary
                >
              </div>
              <div class="wrapper" v-else>
                <div class="tile is-child">
                  <WikiCompanyFeaturedList :companies="paginatedCompanies" />
                </div>
                <div class="tile is-child">
                  <b-pagination
                    v-if="paginatedCompanies.length > perPage"
                    :total="total"
                    v-model:current="current"
                    :order="'is-centered'"
                    :per-page="perPage"
                  />
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "CompaniesPage",

  data() {
    return {
      current: 1,
      perPage: 5,
      search: "",
      industry: "",
      loading: false,
    };
  },

  created() {
    this.searchForCompanies = _.debounce(this.searchForCompanies, 300);
  },

  computed: {
    companies() {
      return this.$store.getters["companies/getCompanies"];
    },

    total() {
      return this.companies.length;
    },

    paginatedCompanies() {
      const pageNumber = this.current - 1;
      return this.companies.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },
  },

  methods: {
    searchForCompanies: async function () {
      this.loading = true;
      await this.$store.dispatch("companies/fetchCompanies", {
        search: this.search,
        industry: this.category,
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $primary-slate-gray;
}
</style>
