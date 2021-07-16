<template>
  <div>
    <div class="block">
      <WikiCardPrimary class="container">
        <template v-slot:content>
          <div class="columns">
            <div class="column is-half">
              <WikiCompanyFeaturedList
                v-if="!hasSearchedCompanies"
                class="container"
                :companies="featuredCompanies"
              />
              <WikiCompanyList v-else :companies="featuredCompanies" style="background: rgb(242, 245, 247)" />
            </div>
            <hr v-if="$device.isMobile" />
            <div class="column is-half">
              <WikiPersonFeaturedList
                v-if="!hasSearchedPeople"
                class="container"
                :people="featuredPeople"
              />
              <WikiPersonList v-else :profiles="featuredPeople" style="background: rgb(242, 245, 247)" />
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

  mounted() {
    this.$store.commit(
      "companies/setCompanies",
      this.$store.getters["companies/getFeaturedCompanies"]
    );
    this.$store.commit(
      "people/setPeople",
      this.$store.getters["people/getFeaturedPeople"]
    );
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $primary-slate-gray;
}
</style>
