<template>
  <div class="base-layout-outer">
    <WikiSearchResults />

    <!-- <BaseLayout>
      <template v-slot:menu><horizontal /></template>
      <template v-slot:sidebar>
        <BigSidebar
          :user_name="profile.first_name"
          :user_id="profile.person_profiles ? profile.person_profiles[0] : '/404'"
          :job_title="profile.description"
          :img_url="profile.avatar"
          :has_finished_profile="false"
          :has_premium="false"
          :statistics_array="[
            { key: 'test', value: 76 },
            { key: 'test1', value: 762 },
          ]"
        />
      </template>
      <template v-slot:content>
        <nuxt />
      </template>
      <template v-slot:footer>
        <Footer />
      </template>
    </BaseLayout> -->
    <WikiNavbar />
    <div class="base-layout-content columns">
      <div class="column is-one-fifth pr-0">
        <WikiSidebarPrimary />
      </div>
      <div class="column">
        <nuxt class="main-content" />
      </div>
    </div>
    <WikiFooter />
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
  padding-top: 38px;
}

.main-content {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #e9ebef 100%);
  min-height: calc(100vh - 80px);
  padding-bottom: 50px;
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
</style>
