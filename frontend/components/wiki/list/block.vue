<template>
  <div class="blocklist-container">
    <div class="blocklist-label" v-if="is_collection">
      <!-- <b-navbar>
        <template #start> -->
      <WikiTextMultiLine v-if="collection_name === 'companies'">{{ num_companies }} companies in</WikiTextMultiLine
      ><WikiInputLocationSelect v-model="companies_selected_location" v-if="collection_name === 'companies'" />
      <WikiTextMultiLine v-if="collection_name === 'people'">{{ num_people }} people in</WikiTextMultiLine
      ><WikiInputLocationSelect v-model="people_selected_location" v-if="collection_name === 'people'" />
      <!-- <b-dropdown v-model="selected_item" aria-role="list">
            <template #trigger>
              <b-button type="is-primary" icon-right="menu-down"> {{ selected_item }} </b-button>
            </template>

            <b-dropdown-item :value="item" :key="key" aria-role="listitem" v-for="(item, key) in default_locations">
              <span>{{ item }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-navbar> -->
    </div>
    <div class="blocklist-body block" @scroll="handleScroll">
      <div class="blocklist-header" v-if="is_directory">
        <b-icon size="is-large" icon="chart-bell-curve" /><WikiHeaderPrimary gray :size="3" :semantic="6">
          Tag, you're it!
        </WikiHeaderPrimary>
      </div>
      <div class="blocklist-content">
        <ul>
          <li v-for="(obj, key) in data" :key="key">
            <WikiCardPeople v-if="collection_name === 'people'" :data="obj"></WikiCardPeople>
            <WikiCardCompanies v-if="collection_name === 'companies'" :data="obj"></WikiCardCompanies>
            <hr v-if="key !== data.length - 1" />
          </li>
        </ul>
      </div>
      <div class="blocklist-paginated-footer"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    is_collection: {
      type: Boolean,
      required: false,
    },
    collection_name: {
      type: String,
      required: false,
      default: "companies",
    },
    is_directory: {
      type: Boolean,
      required: false,
    },
    directory_name: {
      type: String,
      required: false,
      default: "Fortune_500",
    },
  },
  data() {
    return {
      default_collections: ["companies", "people"],
      default_directories: ["Fortune_500", "People_Reccomendations", "Popular_Searches", "Recent_Searches"],
      default_locations: [
        "The World",
        "Europe",
        "America",
        "Asia",
        "The Pasific",
        "The US",
        "China",
        "India",
        "Russia",
        "France",
        "Germany",
        "England",
      ],
      selected_item: "The World",
      companies_selected_location: "",
      people_selected_location: "",
      num_people: 0,
      num_companies: 0,
      scrolled_to_bottom: false,
    };
  },
  computed: {
    ...mapGetters(["companies/getCompanies"]),
    data: function () {
      if (this.collection_name === "companies" && this.is_collection) {
        return this.$store.state.companies.companies; // TODO: Move down to fix data flow when people arrive!
      }
      if (this.collection_name === "people" && this.is_collection) {
        return this.$store.state.people.people;
      }
    },
  },
  methods: {
    ...mapGetters(["people/fetchPeople"]),
    handleScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.scrolled_to_bottom = true;
      } else {
        this.scrolled_to_bottom = false;
      }
    },
  },
  async created() {
    // if (this.collection_name === "companies") {
    //   await this.$store.dispatch("companies/fetchCompanies", "test");
    // }
  },
};
</script>
<style lang="scss" scoped>
.blocklist-container {
  animation-duration: 200ms;
  animation-timing-function: ease-out;
  transition: 200ms;
  margin: auto;
  width: 100%;
  max-width: 760px;
  @include mobile {
    max-width: 100%;
  }
  display: flex;
  flex-direction: column;
}
.blocklist-label {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1em 0.3em 0.3em 0.1em;
  margin: 0.3em 0.5em 0.5em 0.3em;
}
.blocklist-header {
  align-items: center;
  padding-left: 0.6em;
  padding-top: 0.6em;
  font-weight: 300;
  .icon {
    color: $logo-blue;
    margin-right: 0.4em;
  }
  display: flex;
}
.blocklist-body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  height: calc(100vh - 210px);
  border: 1px solid rgba(16, 48, 104, 0.3);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: #ffffff;

  overflow-y: scroll;
}
.blocklist-content {
  margin-top: 1.7em;

  li {
    height: auto;
    margin-left: 0.8em;
    margin-right: 1.1em;
    margin-bottom: 1.4em;
    margin-top: 0.3em;
  }
}
</style>
