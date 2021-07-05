<template>
  <div class="wikiprofile-navbar-wrapper">
    <div class="overlay" @click="toggleNavigationDrawer"></div>
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
            <template v-slot:label>
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
              placeholder="Type here to search"
              v-model="search"
              class="autocomplete-input"
              group-field="type"
              size="is-small"
              clearable
              :rounded="$device.isMobile"
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

        <div class="toolbar__buttons is-hidden-mobile">
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
      @click="toggleNavigationDrawer"
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
        <nuxt-link
          class="drawer-item"
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.link"
        >
          <WikiIconWicon class="drawer-item__icon" :icon="item.icon" />
          <span class="has-text-weight-semibold">
            {{ item.name }}
          </span>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      isFetching: false,
      navItems: [
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
    };
  },

  methods: {
    toggleNavigationDrawer() {
      const navDrawer = document.querySelector(".navigation-drawer");
      const overlay = document.querySelector(".overlay");
      navDrawer.classList.toggle("navigation-drawer--close");
      navDrawer.classList.toggle("navigation-drawer--active");
      overlay.classList.toggle("overlay--active");
    },

    toggleAccountModal() {
      const accountModal = document.querySelector(".account-modal__content");
      accountModal.classList.toggle("account-modal__content--active");
    },

    async attemptLogout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
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

      await this.searchCompanies(this.search);

      this.isFetching = false;
    },

    search_focus(bool) {
      this.$store.commit("search/setFocus", bool);
    },
  },

  mounted() {
    console.log("context:", this.context);
  }
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
  border-bottom: $wikiline;

  @include mobile {
    height: 75px;
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
  height: 100vh;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, visibility, width;
}

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
  display: flex;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
  }

  .drawer-item {
    padding: 0.5rem 1rem;
    border-bottom: $wikiline_thin;

    @include mobile {
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
</style>