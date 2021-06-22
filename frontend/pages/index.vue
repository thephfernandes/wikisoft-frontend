<template>
  <div>
    <div class="block">
      <div class="columns">
        <div class="column">
          <WikiCompanyFeaturedList :companies="featuredCompanies" />
        </div>
        <div class="column">
          <WikiPersonFeaturedList :people="featuredPeople" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import featuredCompaniesData from "~/assets/data/featured-companies.json";
import featuredPeopleData from "~/assets/data/featured-people.json";
export default {
  layout: ({ isMobile }) => (isMobile ? "mobile" : "default"),

  computed: {
    featuredCompanies() {
      return featuredCompaniesData;
    },

    featuredPeople() {
      return featuredPeopleData;
    },
  },
};
</script>
