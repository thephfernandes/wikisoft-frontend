<template>
  <div class="tile container is-full-width is-fullheight">
    <div class="tile is-vertical">
      <!-- <div class="tile is-parent is-12">
        <div class="tile is-child">
          <WikiSearchCard @search="submitSearch" />
        </div>
      </div> -->
      <div class="tile">
        <div class="tile is-parent is-vertical is-6">
          <div class="tile is-child">
            <WikiPersonList :profiles="paginatedProfiles" class="block" />
            <b-pagination
              :total="totalProfiles"
              v-model:current="currentProfilePage"
              :order="'is-centered'"
              :per-page="perPage"
            />
          </div>
        </div>
        <div class="tile is-parent is-vertical is-6">
          <div class="companies-loading" v-if="loading">loading</div>
          <div class="companies-list" v-else>
            <div
              class="company-card-wrapper block"
              v-for="(item, i) in paginatedCompanies"
              :key="i"
            >
              <WikiCompanyCard :company="item" />
            </div>
            <b-pagination
              :total="totalCompanies"
              v-model:current="currentCompanyPage"
              :order="'is-centered'"
              :per-page="perPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    page: {
      type: String,
      default: "home",
    },
  },

  data() {
    return {
      posts: [0, 1, 2],
      loading: false,
      currentProfilePage: 1,
      currentCompanyPage: 1,
      profiles: [],
      perPage: 5,
      started: false,
    };
  },

  computed: {
    filteredCompanies() {
      return this.$store.getters["companies/getCompanies"];
    },

    totalProfiles() {
      return this.profiles.length;
    },

    totalCompanies() {
      return this.filteredCompanies.length;
    },

    paginatedProfiles() {
      const pageNumber = this.currentProfilePage - 1;
      return this.profiles.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },

    paginatedCompanies() {
      const pageNumber = this.currentCompanyPage - 1;
      return this.filteredCompanies.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },
  },

  methods: {
    async submitSearch({ search, category }) {
      if (category === "Person") {
        await this.searchPeople(search);
      } else if (category === "Company") {
        await this.searchCompanies(search);
      } else {
        await this.searchPeople(search);
        await this.searchCompanies(search);
      }
    },

    async searchPeople(search) {
      try {
        let people = await this.$directus.items("people").read({
          search: search,
        });
        this.profiles = people.data;
      } catch (error) {
        console.error(error);
      }
    },

    async searchCompanies(query) {
      this.loading = true;
      await this.$store.dispatch("companies/fetchCompanies");
      this.loading = false;
    },

    searchOnNextTick: async function () {
      if (this.started === false) {
        let sane_default = _.sample([
          "microsoft",
          "google",
          "apple",
          "alphabet",
          "tesla",
          "oracle",
          "two sigma",
          "palantir",
        ]);
        await this.$store.dispatch("companies/fetchCompanies", sane_default);
        // await this.$store.dispatch("people/fetchPeople", sane_default);

        this.started = true;
      }
    },
  },

  async created() {
    this.searchCompanies = _.debounce(this.searchCompanies, 300);
    this.$nextTick(await this.searchOnNextTick(this.$store));
    await this.searchPeople("");
  },

  // mounted() {
  //   this.system.api.get(`/items/companies/`).then((res) => {
  //     console.log(res);
  //   });
  // },
};
</script>
