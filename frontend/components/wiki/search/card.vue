<template>
  <WikiCardPrimary>
    <template v-slot:header>
      <div class="card-header-title">
        <WikiHeaderPrimary :semantic="1" :size="4">{{
          search_label
        }}</WikiHeaderPrimary>
      </div>
    </template>
    <template v-slot:content>
      <b-field>
        <b-field expanded>
          <b-input placeholder="search by name..." @input="emitSearchParameters()" v-model="search" rounded expanded />
          <b-select placeholder="search type" @input="emitSearchParameters()" v-model="category" rounded expanded>
            <option disabled value="">Please select one</option>
            <option>Any</option>
            <option>Person</option>
            <option>Company</option>
          </b-select>
          <p class="control">
            <WikiButton @click="emitSearchParameters()" rounded><span>Search</span></WikiButton>
          </p>
        </b-field>
      </b-field>
    </template>
  </WikiCardPrimary>
</template>

<script>
import _ from "lodash";
export default {
  name: "WikiSearchCard",

  props: {
    disabled_companies: {
      type: Boolean,
      default: false,
    },

    disabled_people: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    search_label: function () {
      if (this.disabled_companies === false && this.disabled_people === false) {
        return "Search our global business database";
      }
      if (this.disabled_companies === true && this.disabled_people === false) {
        return `Search our global business database for ${_.sample([
          "professionals",
          "candidates",
          "people",
          "your next hire",
        ])}`;
      }
      if (this.disabled_companies === false && this.disabled_people === true) {
        return "Search our global business database for companies";
      }
      return "...";
    },
  },

  data() {
    return {
      query: '',
      selectedCategory: String,
      checkboxGroup: [],
      show_more: false,
      filter_age: Number,
      queryString: "",
      search: "",
      category: "",
    };
  },

  methods: {
    emitSearchParameters() {
      this.$emit("search", { search: this.search, category: this.category });
    }
  }
};
</script>

<style scoped lang="scss"></style>
