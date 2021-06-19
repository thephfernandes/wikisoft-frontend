<template>
  <div class="person-search-page">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child">
          <WikiCardPrimary>
            <template v-slot:header>
              <div class="card-header-title">
                <WikiHeaderPrimary :semantic="1" :size="4">Search for people</WikiHeaderPrimary>
              </div>
            </template>
            <template v-slot:content>
              <b-field>
                <b-field expanded>
                  <b-input
                    @input="emitSearchForPeople"
                    placeholder="search by name..."
                    v-model="search"
                    rounded
                    expanded
                  />
                  <p class="control">
                    <WikiButton @click="searchForPeople" rounded><span>Search</span></WikiButton>
                  </p>
                </b-field>
              </b-field>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
      <!-- <WikiListPaginated :items="profiles">
            <template v-slot:list>
              <WikiPersonList :profiles="paginatedProfiles" class="block" />
            </template>
          </WikiListPaginated> -->
      <div class="tile container is-12 is-parent is-vertical">
        <div class="tile is-child">
          <WikiPersonList v-if="paginatedProfiles.length > 0" :profiles="paginatedProfiles" class="block" />
        </div>
        <div class="tile is-child">
          <b-pagination
            v-if="paginatedProfiles.length > 0"
            :total="total"
            :order="'is-centered'"
            v-model="current"
            :per-page="perPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "PeoplePage",

  data() {
    return {
      current: 1,
      perPage: 5,
      search: "",
      profiles: [
        // {
        //   name: "John Doe",
        //   role: "Looking for new opportunities",
        //   connected: false,
        // },
        // {
        //   name: "Adam Walker",
        //   role: "Senior Project Manager",
        //   connected: false,
        // },
        // {
        //   name: "Jinki Mehta",
        //   role: "Senior Product Designer",
        //   connected: true,
        // },
        // {
        //   name: "Alice Winkelvoss",
        //   role: "Digital Designer",
        //   connected: false,
        // },
        // {
        //   name: "Pedro Fernandes",
        //   role: "Professional Hacker",
        //   connected: true,
        // },
        // {
        //   name: "Jamie Fox",
        //   role: "Digital Branding Consultant",
        //   connected: false,
        // },
        // {
        //   name: "Brandon Grimm",
        //   role: "Freelance Sound Engineer",
        //   connected: false,
        // },
        // {
        //   name: "Angelo Bobangelo",
        //   role: "Jack of all trades",
        //   connected: true,
        // },
        // {
        //   name: "Homer J Simpson",
        //   role: "Nuclear Power Plant Manager",
        //   connected: false,
        // },
        // {
        //   name: "Pedro Fernandez",
        //   role: "Professional Hacker but spanish",
        //   connected: true,
        // },
        // {
        //   name: "Benjamin Razzmuzen",
        //   role: "Idk something with computers?",
        //   connected: false,
        // },
        // {
        //   name: "Michael Jordan",
        //   role: "6x NBA Champions | Chicago Bulls",
        //   connected: false,
        // },
        // {
        //   name: "Joe Mama",
        //   role: "Professional masterchef commentator",
        //   connected: true,
        // },
        // {
        //   name: "Alice Winkelvoss",
        //   role: "Digital Designer",
        //   connected: false,
        // },
        // {
        //   name: "That bitch Carol Baskins",
        //   role: "Husband Killer",
        //   connected: true,
        // },
      ],
      current: 1,
      perPage: 5,
    };
  },

  computed: {
    total() {
      return this.profiles.length;
    },

    paginatedProfiles() {
      const pageNumber = this.current - 1;
      return this.profiles.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);
    },
  },

  methods: {
    searchForPeople: async function () {
      let people = await this.$directus.items("people").read({
        search: this.search,
      });
      this.profiles = people.data;
    },

    emitSearchForPeople: async function () {
      await this.searchForPeople();
    },
  },

  async created() {
    this.emitSearchForPeople = _.debounce(this.searchForPeople, 300);
  },
};
</script>
