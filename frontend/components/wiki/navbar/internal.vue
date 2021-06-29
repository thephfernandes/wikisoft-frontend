<template>
  <div class="nav">
    <div class="nav-links nav-links__left">
      <div class="nav-links__item"  v-for="(item, i) in leftList" :key="i">
        <nuxt-link :to="item.link">
          <WikiIconWicon class="nav-links__icon" :icon="item.icon" size="0.7" />
          <span class="has-text-weight-semibold">
            {{ item.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
    <div class="nav-links nav-links__right">
      <div class="nav-links__item" v-for="(item, i) in rightList" :key="i" v-show="item.name !== 'Me' || $auth.user">
        <nuxt-link :to="item.link">
          <WikiIconWicon :icon="item.icon" size="0.7" />
          <span class="has-text-weight-semibold">
            {{ item.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photoSrc: {
      type: String,
      required: false,
    },
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
          link: "/messages",
          name: "Messages",
          icon: "chat-outline",
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
}

.nav-links__left > .nav-links__item {
  border-right: $wikiline;
}

.nav-links__right > .nav-links__item {
  border-left: $wikiline;
}

.nav-links__item {
  height: 100%;
  align-items: center;

  @include desktop {
    padding: 0.5rem 1.5rem;
  }
}

.nav-links__icon {
  margin-right: 0.25rem;
}
</style>