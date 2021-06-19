<template>
  <nav class="nav-list-wrapper" role="navigation" aria-label="main navigation">
    <div class="nav-list-container">
      <ul class="nav-list">
        <NuxtLink class="item-wrapper" :to="obj.link" v-for="(obj, key) in navList" :key="key">
          <li class="nav-list-element">
            <WikiIconWicon class="nav-item-icon" :icon="obj.icon" size="0.7" />
            <span class="has-text-weight-semibold nav-item-text">{{
              obj.name
            }}</span>
          </li>
        </NuxtLink>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navList: [
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
    };
  },
};
</script>
<style lang="scss" scoped>
.nav-list-wrapper {
  border-bottom: $wikiline;
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
}

.nav-list {
  display: flex;
  height: 100%;
  margin-right: 0;
  margin-bottom: -1px;
  margin-left: -1px;
  list-style-type: none;
  padding: 0;

  .nav-list-element {
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    border-right: $wikiline;

    @include mobile {
      justify-content: center;
    }

    @include desktop {
      padding: 0 2em;
    }
  }
}

.item-wrapper {
  @include mobile {
      flex-grow: 1;
    }
}

.nav-item-icon {
  @include desktop {
    margin-right: 0.5em;
  }
}

.nav-item-text {
  @include mobile {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0 0 0 0);
  }
}
</style>
