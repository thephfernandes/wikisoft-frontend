<template>
  <div class="mobile-global-search">
    <div class="is-flex is-align-items-center is-justify-content-space-evenly">
      <b-input
        placeholder="search"
        icon="magnify"
        type="search"
        v-model="search"
        rounded
        expanded
        @input="submitSearch()"
      />
      <b-button @click="isOpen = !isOpen">
        <b-icon icon="tune" />
      </b-button>
    </div>
    <b-collapse v-model="isOpen">
      <div
        class="collapse-content-wrapper is-flex is-justify-content-space-evenly"
      >
        <b-checkbox v-model="companySearch">company</b-checkbox>
        <b-checkbox v-model="peopleSearch">people</b-checkbox>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      isOpen: false,
      companySearch: true,
      peopleSearch: true,
    };
  },

  methods: {
    submitSearch() {
      if (this.companySearch) {
        this.searchCompanies(this.search);
      }
      if (this.peopleSearch) {
        this.searchPeople(this.search);
      }
    },

    searchPeople(search) {
      this.$store.dispatch("people/fetchPeople", search);
    },

    searchCompanies(search) {
      this.$store.dispatch("companies/fetchCompanies");
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-global-search {
  z-index: 30;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $boundingbox-secondary-col;
}

.collapse-content-wrapper {
  padding: 0.25rem 0;
}
</style>