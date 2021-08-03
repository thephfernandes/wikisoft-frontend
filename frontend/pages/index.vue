<template>
  <div>
    <div class="block pt-0 mt-0">
      <WikiCardPrimary class="container mt-0 pt-0">
        <template v-slot:content>
          <div class="columns" v-if="!loading">
            <div class="column is-half pl-0">
              <WikiCompanyFeaturedList
                v-if="!hasSearchedCompanies"
                class="container"
                :companies="featuredCompanies"
              />
              <WikiCompanyList
                v-else
                :companies="featuredCompanies"
                style="background: rgb(242, 245, 247)"
              />
            </div>
            <hr v-if="$device.isMobile" />
            <div class="column is-half pr-0">
              <WikiPersonFeaturedList
                v-if="!hasSearchedPeople"
                class="container"
                :people="featuredPeople"
              />
              <WikiPersonList
                v-else
                :profiles="featuredPeople"
                style="background: rgb(242, 245, 247)"
              />
            </div>
          </div>
        </template>
      </WikiCardPrimary>
    </div>
  </div>
</template>

<script>
export default {
  layout: ({ isMobile }) => (isMobile ? "mobile" : "default"),

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    featuredCompanies() {
      return this.$store.getters["companies/getCompanies"];
    },

    featuredPeople() {
      return this.$store.getters["people/getPeople"];
    },

    hasSearchedCompanies() {
      return (
        this.featuredCompanies.length !==
          this.$store.getters["companies/getFeaturedCompanies"].length ||
        this.featuredCompanies[0] !==
          this.$store.getters["companies/getFeaturedCompanies"][0]
        // !(this.featuredCompanies.filter(item => item.name.includes("ICBC")).length > 0)
      );
    },

    hasSearchedPeople() {
      return (
        this.featuredPeople.length !==
          this.$store.getters["people/getFeaturedPeople"].length ||
        this.featuredPeople[0] !==
          this.$store.getters["people/getFeaturedPeople"][0]
      );
    },
  },

  async mounted() {
    //set companies equal to static featured initial companies
    this.loading = true;
    this.$store.commit(
      "companies/setCompanies",
      this.$store.getters["companies/getFeaturedCompanies"]
    );
    // await this.$store.dispatch("companies/fetchCompanies", "directus");
    // this.$store.commit("companies/setCompanies", this.featuredCompanies.filter(item => !(item.name.toLowerCase().includes("acme"))))
    this.$store.commit(
      "people/setPeople",
      this.$store.getters["people/getFeaturedPeople"]
    );
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $primary-slate-gray;
}

.column {
  @include mobile {
    padding: 0;
  }
}
</style>
