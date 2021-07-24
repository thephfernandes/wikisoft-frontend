<template>
  <div class="wikiprofile-navbar-wrapper">
    <div
      class="overlay"
      v-if="$device.isMobile"
      @click="toggleNavigationDrawer"
    ></div>
    <header class="toolbar">
      <div class="toolbar__content">
        <div class="toolbar__account is-hidden-desktop">
          <button
            class="toolbar__button account-modal__trigger"
            @click="toggleAccountModal"
          >
            <WikiProfilePhoto dimensions="32x32" />
          </button>

          <div class="account-modal__content">
            <div>
              <span @click="toggleAccountModal" class="has-text-primary">
                <a href="/account">My account</a>
              </span>
            </div>

            <div>
              <a role="button">
                <span @click="attemptLogout" class="has-text-primary">
                  <a role="button">Sign out</a>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          class="toolbar__logos is-flex is-align-items-center is-hidden-mobile"
        >
          <img
            class="wikiprofile-icon mr-3"
            src="../../../assets/logos/wikiprofile/wikiprofile-logo-icon.svg"
            alt="wikiprofile icon"
          />
          <img
            class="wikiprofile-logo"
            src="../../../assets/logos/wikiprofile/wikiprofile-logo-square-white.svg"
            alt="wikiprofile logo"
          />
        </div>

        <div class="toolbar__input">
          <b-field>
            <template v-slot:label v-if="$device.isDesktop">
              <p
                class="
                  toolbar__input-slogan
                  is-size-6-tablet is-hidden-mobile
                  has-text-white has-text-weight-light has-text-centered
                "
              >
                The Global Directory of
                <u class="has-text-weight-normal">Companies</u> and
                <u class="has-text-weight-normal">Business People</u>
              </p>
            </template>

            <b-autocomplete
              placeholder="Search"
              v-model="search"
              class="autocomplete-input"
              group-field="type"
              clearable
              :size="$device.isMobile ? '' : 'is-small'"
              :rounded="$device.isMobile"
              group-options="items"
              icon="magnify"
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

        <div class="toolbar__buttons is-hidden-mobile">
          <div v-if="!authenticated">
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

          <div v-else>
            <WikiButton size="is-small" inverted outlined>
              <nuxt-link to="/account">
                <span class="has-text-white">My account</span>
              </nuxt-link>
            </WikiButton>
            <WikiButton @click="attemptLogout" size="is-small" inverted>
              <strong class="has-text-primary">Sign out</strong>
            </WikiButton>
          </div>
        </div>

        <button
          class="toolbar__button navigation-drawer__trigger is-hidden-desktop"
          @click="toggleNavigationDrawer"
        >
          <div class="button_content">
            <WikiIconWicon class="button--icon" icon="menu" size="medium" />
          </div>
        </button>
      </div>
    </header>
    <nav
      class="
        navigation-drawer navigation-drawer--close navigation-drawer--fixed
      "
    >
      <div class="navigation-drawer__header">
        <nuxt-link to="/">
          <div class="navigation-drawer__logos">
            <div class="img-wrapper" style="margin-right: 0.25rem">
              <img
                class="wikiprofile-icon"
                src="../../../assets/logos/wikiprofile/wikiprofile-logo-icon.svg"
                alt="wikiprofile icon"
              />
            </div>
            <div class="img-wrapper">
              <img
                class="wikiprofile-logo"
                src="../../../assets/logos/wikiprofile/wikiprofile-logo-horizontal-blue.svg"
                alt="wikiprofile logo"
              />
            </div>
          </div>
        </nuxt-link>
        <button
          class="
            toolbar__button
            navigation-drawer__trigger navigation-drawer__trigger--close
          "
          @click="toggleNavigationDrawer"
        >
          <WikiIconWicon
            type="is-primary"
            class="button--icon"
            icon="close"
            size="medium"
          />
        </button>
      </div>
      <div class="navigation-drawer__items">
        <div
          class="event-wrapper"
          v-if="$device.isDesktop"
          @click="toggleNavigationDrawer"
        >
          <div class="nav-links nav-links__left">
            <nuxt-link
              class="drawer-item nav-links__item"
              v-for="(item, i) in navItems"
              v-show="!($device.isMobile && item.name === 'Home')"
              :key="i"
              :to="item.link"
            >
              <WikiIconWicon class="drawer-item__icon" :icon="item.icon" />
              <span class="has-text-weight-semibold">
                {{ item.name }}
              </span>
            </nuxt-link>
          </div>

          <div class="nav-links nav-links__right">
            <nuxt-link
              class="nav-links__item"
              v-for="(item, i) in desktopNavItems"
              :key="i"
              :to="item.link"
            >
              <WikiIconWicon
                v-if="item.name !== 'Me'"
                class="nav-links__icon"
                :icon="item.icon"
                size="0.7"
              />
              <WikiProfilePhoto
                v-else
                class="nav-links__icon"
                dimensions="16x16"
              />
              <span class="has-text-weight-semibold">
                {{ item.name }}
              </span>
            </nuxt-link>
          </div>
        </div>

        <div class="nav-links nav-links__bottom" v-if="$device.isMobile">
          <nuxt-link
            to="/account"
            class="nav-links__item drawer-item has-text-weight-semibold"
            style="line-height: 2.25rem; color: inherit"
          >
            <span class="has-text-weight-semibold"> My account </span>
          </nuxt-link>
          <nuxt-link
            to="/account"
            class="nav-links__item drawer-item has-text-weight-semibold"
            style="line-height: 2.25rem; color: inherit"
          >
            <span class="has-text-weight-semibold"> Settings </span>
          </nuxt-link>
          <b-collapse
            animation="slide"
            class="footer-section"
            v-for="(section, i) in sections"
            :key="i"
            :open="false"
          >
            <template v-slot:trigger>
              <div
                class="
                  footer-section__title
                  nav-links__item
                  drawer-item
                  has-text-weight-semibold
                "
                style="line-height: 2.25rem"
              >
                {{ section.title }}
              </div>
            </template>
            <template v-slot:default>
              <div class="footer-section__links">
                <div
                  class="footer-section__links-item drawer-item"
                  style="border-bottom: none"
                  v-for="(link, j) in section.links"
                  :key="j"
                >
                  <nuxt-link :to="link.to">
                    {{ link.title }}
                  </nuxt-link>
                </div>
              </div>
            </template>
          </b-collapse>
        </div>
      </div>
    </nav>
    <div class="appbar" v-if="$device.isMobile">
      <div class="appbar__content">
        <div class="appbar__links">
          <nuxt-link
            class="
              appbar__item
              is-flex is-flex-direction-column is-align-items-center
            "
            v-for="(item, i) in navItems"
            :key="i"
            :to="item.link"
          >
            <WikiIconWicon :icon="item.icon" size="default" />
            <span class="has-text-weight-semibold">
              {{ item.name }}
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      search: "",
      isFetching: false,
      navItems: [
        {
          link: "/",
          name: "Home",
          icon: "home-outline",
          size: "medium",
        },
        {
          link: "/people",
          name: "People",
          icon: "account-outline",
          size: "medium",
        },
        {
          link: "/companies",
          name: "Companies",
          icon: "domain",
          size: "medium",
        },
        {
          link: "/employer",
          name: "Employers",
          icon: "briefcase-outline",
          size: "medium",
        },
      ],

      desktopNavItems: [
        {
          link: "/account/" + this.$auth.user?.id + "/settings",
          name: "Settings",
          icon: "cog-outline",
          size: "medium",
        },
        {
          link: "/account",
          name: "Me",
        },
      ],

      sections: [
        {
          title: "About WikiProfile",
          links: [
            {
              title: "Privacy policy",
              to: "https://www.wikiprofile.com/pdf/021521_Wikisoft-privacy-policy.pdf",
            },
            {
              title: "Cookie policy",
              to: "https://www.wikiprofile.com/pdf/021521_Cookie-policy.pdf",
            },
            {
              title: "User agreement",
              to: "https://www.wikiprofile.com/pdf/021621_-Terms-of-Use.pdf",
            },
            {
              title: "Code of ethics",
              to: "https://www.wikiprofile.com/pdf/021521_Code-of-ethics_.pdf",
            },
            {
              title: "Review guidelines",
              to: "https://www.wikiprofile.com/pdf/Review_guidelines_wikiprofile.pdf",
            },
          ],
        },
        {
          title: "Account",
          links: [
            {
              title: "Get a free account",
              to: "/auth/sign-up",
            },
            {
              title: "Get a free employer account",
              to: "/employer",
            },
          ],
        },
        {
          title: "About Wikisoft Corp.",
          links: [
            {
              title: "About",
              to: "https://wikisoft.com",
            },
            {
              title: "Contact",
              to: "https://wikisoft.com/contact",
            },
            {
              title: "Investor relations",
              to: "https://wikisoft.com/press",
            },
            {
              title: "Disclaimers",
              to: "https://www.wikiprofile.com/pdf/Website-Disclaimers.pdf",
            },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      authenticated: "user/getAuthenticated",
      authType: "user/getAuthType",
    }),
  },

  methods: {
    ...mapMutations({
      setQuery: "search/setQuery",
      setTypes: "search/setQueryTypes",
      add: "search/addQueryType",
      remove: "search/removeQueryType",
    }),

    toggleNavigationDrawer() {
      if (!this.$device.isMobile) {
        return;
      }
      const navDrawer = document.querySelector(".navigation-drawer");
      const overlay = document.querySelector(".overlay");
      navDrawer.classList.toggle("navigation-drawer--close");
      navDrawer.classList.toggle("navigation-drawer--active");
      overlay.classList.toggle("overlay--active");
    },

    toggleAccountModal() {
      if (!this.$device.isMobile) {
        return;
      }
      const accountModal = document.querySelector(".account-modal__content");
      accountModal.classList.toggle("account-modal__content--active");
    },

    async attemptLogout() {
      if (this.authType === "") {
        try {
          await this.$auth.logout();
        } catch (error) {
          console.error(error);
        }
      }

      if (this.authType === "facebook") {
        FB.logout((response) => {
          window.localStorage.clear()
          console.log("facebook sign out callback:", response);
        });
      }

      if (this.authType === "google") {
        // this.$gapi.logout(() => window.localStorage.clear());
      }

      this.$store.commit("user/setAuthType", "");
      this.$store.commit("user/setAuthenticated", false);
      this.$router.push("/login");
    },

    redirectToSearch() {
      this.$router.push("/search");
    },

    async emitSearch() {
      this.isFetching = true;
      this.items = [];

      this.$emit("input", { search: this.search, category: this.category });
      this.setQuery(this.search);
      if (this.search && this.search.length > 0) {
        await this.searchPeople(this.search);
        await this.searchCompanies(this.search);
      } else {
        this.$store.commit(
          "companies/setCompanies",
          this.$store.getters["companies/getFeaturedCompanies"]
        );
        this.$store.commit(
          "people/setPeople",
          this.$store.getters["people/getFeaturedPeople"]
        );
      }

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
      // this.$store.commit("search/setFocus", bool);
    },

    async searchCompanies() {
      await this.$store.dispatch("companies/fetchCompanies");
    },

    async searchPeople() {
      await this.$store.dispatch("people/fetchPeople");
    },
  },

  mounted() {
    this.emitSearch = _.debounce(this.emitSearch, 300);
  },
};
</script>

<style lang="scss" scoped>
.wikiprofile-navbar-wrapper {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.toolbar {
  left: 0;
  right: 0;
  background: $primary;

  @include mobile {
    height: 75px;
    border-bottom: $wikiline;
  }

  @include desktop {
    height: 95px;
  }
}

.toolbar__content {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 0;

  @include mobile {
    padding: 4px 16px;
  }

  @include desktop {
    padding: 1rem 2rem;
  }

  ::before,
  ::after {
    box-sizing: inherit;
  }
}

.toolbar__input {
  margin-right: auto;
  margin-left: auto;

  @include mobile {
    padding: 12px;
  }

  @include desktop {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
  }

  .toolbar__input-slogan {
    @include mobile {
      display: none;
    }
  }
}

.toolbar__account {
  position: relative;
}

.toolbar__logos {
  img {
    object-fit: contain;
    max-height: 65px;
  }
}

.account-modal__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-modal__content {
  visibility: hidden;
  position: absolute;
  top: 42px;
  width: 35vw;
  background: white;
  display: flex;
  border-radius: 0.2rem;
  padding: 0.5rem;

  @include mobile {
    flex-direction: column;

    > * {
      width: 100%;
      padding: 0.25rem;
    }

    > :not(:first-child) {
      margin-bottom: 2px;
      border-top: $wikiline_thin;
    }
  }
}

.account-modal__content--active {
  visibility: visible;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

.dropdown-menu {
  position: absolute;
}

.toolbar__button {
  border-style: none;
  background-color: transparent;
}

.toolbar__buttons {
  position: absolute;
  right: 1rem;
  top: 1.5rem;

  .button {
    border-radius: 1px;
  }
}

.navigation-drawer {
  background: #ffffff;
  display: flex;

  @include mobile {
    height: 100vh;
    top: 0;
    right: 0;
    transform: translateX(120%);
    width: 320px;
    flex-direction: column;
    overflow: hidden;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: transform, visibility, width;
  }
}

@include mobile {
  .navigation-drawer--active {
    transform: translateX(0%);
  }

  .navigation-drawer--close {
    visibility: hidden;
  }

  .navigation-drawer--fixed {
    position: fixed;
    z-index: 2;
  }
}

.navigation-drawer__trigger {
  color: white;
}

.navigation-drawer__trigger--close {
  color: $primary;
  margin-left: 0.25rem;
}

.overlay {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, opacity;
  will-change: opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.overlay--active {
  visibility: visible;
  opacity: 0.5;
}

.navigation-drawer__header {
  @include desktop {
    display: none;
  }

  height: 75px;
  border-bottom: $wikiline;
  padding: 0.5rem;
  display: flex;
  align-items: center;

  .navigation-drawer__logos {
    display: flex;
    align-items: center;

    .img-wrapper {
      display: flex;
      align-items: center;
    }

    img {
      object-fit: contain;
      max-height: 38px;
    }
  }
}

.navigation-drawer__items {
  .event-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
  }

  @include desktop {
    justify-content: space-between;
    width: 100%;
    height: 42px;
    border-bottom: $wikiline;
  }

  .drawer-item {
    padding: 0.5rem 1rem;

    @include mobile {
      border-bottom: $wikiline_thin;
      width: 100%;
    }

    @include desktop {
      padding: 0.25rem 1.5rem;
      padding-bottom: 0.5rem;
    }
  }

  .drawer-item.nuxt-link-exact-active {
    background: white;
    color: #007bff;
  }

  .drawer-item__icon {
    margin-right: 0.5rem;
  }
}

.autocomplete-input {
  .input {
    @include mobile {
      border-radius: 9999px;
      padding-left: calc(calc(0.75em - 1px) + 0.375em);
      padding-right: calc(calc(0.75em - 1px) + 0.375em);
    }
  }
}

.nav-links,
.nav-links__item {
  display: flex;
}

.nav-links {
  @include mobile {
    flex-direction: column;
  }
}

.nav-links__left {
  @include mobile {
    width: 100%;
  }
}

.nav-links__bottom {
  width: 100%;
}

@include desktop {
  .nav-links__left > .nav-links__item {
    border-right: $wikiline_thin;
  }

  .nav-links__right > .nav-links__item {
    border-left: $wikiline_thin;
  }

  .nav-links__item {
    height: 100%;
    align-items: center;
    background: linear-gradient(180deg, #ffffff 0%, #e3f2ff 100%);
    padding: 0.25rem 1.5rem;
    padding-bottom: 0.5rem;
  }

  .nav-links__item.nuxt-link-exact-active {
    background: white;
    color: #007bff;
  }

  .nav-links__icon {
    margin-right: 0.5rem;
  }
}

.appbar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  border: $wikiline;
  background: white;
}

.appbar__links {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.appbar__item {
  flex-grow: 1;
}
</style>
