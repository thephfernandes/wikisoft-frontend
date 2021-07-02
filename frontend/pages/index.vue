<template>
  <div>
    <div class="block">
      <WikiCardPrimary style="background: rgb(242, 245, 247);">
        <template v-slot:content>
          <div class="columns">
            <div class="column">
              <WikiCompanyFeaturedList style="background: rgb(242, 245, 247);" :companies="featuredCompanies" />
            </div>
            <div class="column">
              <WikiPersonFeaturedList style="background: rgb(242, 245, 247);" :people="featuredPeople" />
            </div>
          </div>
        </template>
      </WikiCardPrimary>
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
