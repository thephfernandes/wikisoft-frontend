<template>
  <div class="base-layout-outer">
    <WikiSearchResults />
    <WikiNavbar />
    <WikiNavbarInternal class="internal-nav" />
    <div class="base-layout-content columns my-0">
      <div class="column base-layout__sidebar is-one-fifth pr-0 pt-1">
        <WikiSidebarPrimary />
      </div>
      <div class="column pt-1 pl-0 base-layout__content">
        <nuxt class="main-content mt-3 px-3" />
      </div>
    </div>
    <WikiFooterPrimary />
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {},
    };
  },

  mounted() {
    try {
      this.profile = this.$auth.user;
    } catch (error) {
      this.$buefy.toast.open({
        message: "not logged in",
        type: "is-warning",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.base-layout-outer {
  width: 100vw;
}

.base-layout-inner {
  width: 100vw;
  height: 100vh;
}

.base-layout-content {
  // @include desktop {
  //   margin-top: 2rem;
  // }

  // .base-layout__sidebar, .base-layout__content {
  //   @include desktop {
  //     padding-top: 1rem;
  //   }
  // }

  .base-layout__content {
    border-left: $wikiline;
  }
}

.main-content {
  position: relative;
  // background: linear-gradient(180deg, #ffffff 0%, #e9ebef 100%);
  min-height: calc(100vh - 80px);
  // @include tablet {
  //   min-height: calc(100vh - 80px);
  // }

  // @include desktop {

  //   min-height: calc(100vh - 80px);
  //   padding-top: 35px;
  // }

  @include mobile {
    min-height: calc(100vh - 170px);
  }
}

.internal-nav {
  @include desktop {
    margin-top: 3rem;
    border-left: $wikiline;
    border-right: $wikiline;
  }
}
</style>
