<template>
  <div class="nav">
    <div class="nav-links nav-links__left">
      <nuxt-link
        :to="item.link"
        class="nav-links__item"
        v-for="(item, i) in leftList"
        :key="i"
      >
        <WikiIconWicon class="nav-links__icon" :icon="item.icon" size="0.7" />
        <span class="has-text-weight-semibold">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
    <div class="nav-links nav-links__right">
      <!-- v-show="item.name !== 'Me' || $auth.user" -->
      <nuxt-link
        :to="item.link"
        class="nav-links__item"
        v-for="(item, i) in rightList"
        :key="i"
      >
        <WikiIconWicon
          v-if="item.name !== 'Me'"
          class="nav-links__icon"
          :icon="item.icon"
          size="0.7"
        />
        <WikiProfilePhoto v-else class="nav-links__icon" dimensions="16x16" />
        <span class="has-text-weight-semibold">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    photoSrc: {
      type: String,
      required: false,
    },
  },
  methods: {
    ...mapGetters({ getMe: ["user/getUser"] }),
    ...mapActions(["user/fetchUser"]),
  },
  data() {
    return {
      leftList: [
        {
          link: "/",
          name: "Home",
          icon: "home",
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
      rightList: [
        {
          link: "/account/" + this.$auth.user.id + "/settings",
          name: "Settings",
          icon: "cog-outline",
          size: "medium",
        },
        {
          link: "/account",
          name: "Me",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav,
.nav-links,
.nav-links__item {
  display: flex;
}

.nav {
  justify-content: space-between;
  border-bottom: $wikiline;
  width: 100%;
}

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
  @include desktop {
    padding: 0.25rem 1.5rem;
    padding-bottom: 0.5rem;
  }
}

.nav-links__item.nuxt-link-exact-active {
  background: white;
  color: #007bff;
}

.nav-links__icon {
  margin-right: 0.5rem;
}
</style>
