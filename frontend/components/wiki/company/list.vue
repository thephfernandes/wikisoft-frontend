<template>
  <div class="company-search-list">
    <div class="filtered-companies grid">
      <div class="company-card-wrapper block" v-for="(item, i) in companies" :key="i">
        <WikiCompanyCard :company="item" />
      </div>
    </div>
  </div>
</template>

<script>
import WikiCompanyCard from "./card.vue";

export default {
  name: "WikiCompanySearchList",
  components: {
    WikiCompanyCard,
  },
  inject: ["system"],
  props: {
    companies: {
      type: Array,
      default: () => {
        return [
          {
            name: "Atlassan",
            status: "Public",
            country: "Denmark",
            employees: ["bob", "alice", "john"],
          },
          {
            name: "Atlassan",
            status: "Public",
            country: "Denmark",
            employees: ["bob", "alice", "john"],
          },
          {
            name: "Atlassan",
            status: "Public",
            country: "Denmark",
            employees: ["bob", "alice", "john"],
          },
          {
            name: "Atlassan",
            status: "Public",
            country: "Denmark",
            employees: ["bob", "alice", "john"],
          },
        ];
      },
    },
  },

  // mounted() {
  //   this.system.api.get(`/items/companies/`).then((res) => {
  //     console.log(res);
  //   });
  // },

  computed: {
    // filteredCompanies: function () {
    //   return this.$store.getters["companies/getCompanies"];
    // },
  },
};
</script>

<style lang="scss" scoped>
.company-search-list {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  @include mobile {
    grid-template-columns: 100%;
  }
  grid-column-gap: 1em;
}
</style>
