<template>
  <b-navbar type="is-primary" fixed-top>
    <template v-slot:brand>
      <nuxt-link to="/">
        <div class="vanity-wrapper">
          <img
            class="logo-icon mr-3"
            src="../../../assets/logos/wikiprofile/wikiprofile-logo-icon.svg"
            alt="wikiprofile icon"
          />
          <img
            class="logo-square"
            src="../../../assets/logos/wikiprofile/wikiprofile-logo-square-white.svg"
            alt="wikiprofile logo"
          />
        </div>
      </nuxt-link>
    </template>

    <template v-slot:start>
      <div class="nav-search-wrapper">
        <b-field custom-class="has-text-white">
          <template v-slot:label>
            <p
              class="navbar-slogan is-size-6-tablet has-text-white has-text-weight-light has-text-centered"
            >
              The Global Directory of
              <u class="has-text-weight-normal">Companies</u> and
              <u class="has-text-weight-normal">Business People</u>
            </p>
          </template>

          <b-autocomplete
            placeholder="Type here to search"
            v-model="search"
            class="autocomplete-input"
            group-field="type"
            size="is-small"
            clearable
            group-options="items"
            :loading="isFetching"
            @focus="search_focus(true)"
            @blur="search_focus(false)"
            @input="emitSearch()"
            @typing="emitSearch()"
            @keyup.enter="redirectToSearch()"
          >
            <template v-slot:default="props">
              <div>{{ props.option.name }}</div>
            </template>

            <template v-slot:footer>
              <div class="show-all-wrapper is-flex is-justify-content-center">
                <a type="button" class="pt-2 has-text-weight-medium"
                  >show more</a
                >
              </div>
            </template>
          </b-autocomplete>
        </b-field>
      </div>
    </template>

    <template v-slot:end>
      <div class="buttons" v-if="!isLoggedIn">
        <WikiButton size="is-small" inverted outlined>
          <nuxt-link to="/login">
            <span class="has-text-white">Login</span>
          </nuxt-link>
        </WikiButton>
        <WikiButton size="is-small" inverted>
          <nuxt-link to="/auth/sign-up">
            <strong class="has-text-primary">Sign Up</strong>
          </nuxt-link>
        </WikiButton>
      </div>
      <div class="buttons" v-else>
        <WikiButton size="is-small" inverted outlined>
          <nuxt-link to="/account">
            <span class="has-text-white">My account</span>
          </nuxt-link>
        </WikiButton>
        <WikiButton size="is-small" inverted>
          <a role="button" @click="attemptLogout">
            <strong class="has-text-primary">Sign out</strong>
          </a>
        </WikiButton>
      </div>
    </template>
  </b-navbar>
</template>

<script>
import _ from "lodash";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      search: "",
      isFetching: false,
      items: [],
    };
  },

  mounted() {
    this.emitSearch = _.debounce(this.emitSearch, 300);
  },

  computed: {
    isLoggedIn() {
      return this.$auth.user != undefined;
    },

    filteredItems() {
      const arr = [];

      this.items.forEach((element) => {
        const items = element.items.filter(
          (item) =>
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
        );
        if (items.length) {
          arr.push({ type: element.type, items: items });
        }
      });

      return arr;
    },
  },

  methods: {
    ...mapMutations({
      setQuery: "search/setQuery",
      setTypes: "search/setQueryTypes",
      add: "search/addQueryType",
      remove: "search/removeQueryType",
    }),

    updateSearchTypes(event) {
      if (event.target.checked) {
        this.add(event.target.value);
      } else {
        this.remove(event.target.value);
      }
    },

    redirectToSearch() {
      this.$router.push("/search");
    },

    async emitSearch() {
      this.isFetching = true;
      this.items = [];

      this.$emit("input", { search: this.search, category: this.category });
      this.setQuery(this.search);

      // await this.searchPeople(this.search);
      await this.searchCompanies(this.search);

      this.isFetching = false;

      // if(this.checkedTypes.find(type => type === "companies")) {
      //   console.log("found companies type");
      //   await this.searchCompanies(this.search);
      // }

      // if(this.checkedTypes.find(type => type === "people")) {
      //   console.log("found people type");
      //   await this.searchPeople(this.search);
      // }
    },

    search_focus(bool) {
      this.$store.commit("search/setFocus", bool);
    },

    async searchPeople(query) {
      await this.$store.dispatch("people/fetchPeople", query).then(
        this.items.push({
          type: "people",
          items: this.$store.getters["people/getPeople"].slice(0, 5),
        })
      );
    },

    async searchCompanies(query) {
      await this.$store.dispatch("companies/fetchCompanies").then(
        this.items.push({
          type: "companies",
          items: this.$store.getters["companies/getCompanies"].slice(0, 5),
        })
      );
    },

    redirectToProfile() {
      this.$router.push(`/people/${this.$auth.user.id}`);
    },

    async attemptLogout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0.75rem 0.75rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
}

.nav-search-wrapper {
  z-index: 300;
  @include desktop {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 35em;
  }
}

.vanity-wrapper {
  display: flex;
  align-items: center;

  .logo-icon {
    max-height: 65px;
  }

  .logo-square {
    max-height: 53px;
  }
}

.dropdown,
.dropdown-button {
  background-color: $boundingbox-primary-col;
  border-bottom: 1px solid darkgrey;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.25);
}

.dropdown-button {
  padding: 0rem 0.5rem;
  border-right: 1px solid darkgrey;
  border-left: 1px solid darkgrey;
  border-radius: 0 0 0.5em 0.5em;
  transform: translateY(101%);
}

.dropdown {
  width: 100%;
  position: absolute;
  z-index: 99;
  top: 20%;
  transition: all 0.2s ease-in-out;
  padding-top: 0.5rem;

  .checkbox-filters {
    padding-top: 1.5rem;
    width: 42%;
  }
}

.open {
  top: 75%;
}

.buttons {
  @include desktop {
    position: absolute;
  }
  justify-content: space-between;

  @include tablet {
    padding-top: 1rem;
    justify-content: flex-end;
  }

  @include mobile {
    padding-top: 1em;
    button {
      flex-grow: 1;
    }
  }

  .button {
    border-radius: 1px;
  }
}

.show-all-wrapper {
  border-top: 1px solid lightgrey;
}

.navbar-slogan {
  @include desktop {
    font-size: 1.25rem;
  }
}

.autocomplete-input {
  font-size: 1rem;
}
</style>
