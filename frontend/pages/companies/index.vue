<template>
  <div class="company-search-page">
    <div class="container">
      <div class="tile is-vertical">
        <div class="tile is-vertical">
          <div class="tile is-parent">
            <div class="tile is-child">
              <WikiCardPrimary>
                <template v-slot:header>
                  <div class="card-header-title">
                    <WikiHeaderPrimary :semantic="1" :size="4"
                      >Search for companies</WikiHeaderPrimary
                    >
                  </div>
                </template>
                <template v-slot:content>
                  <b-field>
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
                  </b-field>
                </template>
              </WikiCardPrimary>
            </div>
          </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
              <WikiCompanyList v-if="paginatedCompanies.length > 0" :companies="paginatedCompanies" class="block" headerless/>
            </div>
            <div class="tile is-child">
              <b-pagination v-if="paginatedCompanies.length > perPage" :total="total" v-model:current="current" :order="'is-centered'" :per-page="perPage" />
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
  name: "CompaniesPage",

  data() {
    return {
      current: 1,
      perPage: 5,
      search: "",
      industry: "",
    }
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
      return this.companies.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);
    },
  },

  methods: {
    searchForCompanies: async function () {
      await this.$store.dispatch("companies/fetchCompanies", {search: this.search, industry: this.category });
    }
  },
};
</script>
