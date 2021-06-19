<template>
  <div class="base-layout-outer">
    <BaseLayout>
      <template v-slot:menu><horizontal /></template>
      <template v-slot:sidebar>
        <BigSidebar
          :user_name="'john doe'"
          :job_title="'lead bla blip bli bla maker'"
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
    </BaseLayout>
  </div>
</template>

<script>
import BigSidebar from "../components/wiki/sidebar/BigSidebar.vue";
import BaseLayout from "../components/wiki/templatelayout/BaseLayout.vue";
import horizontal from "../components/wiki/menu/horizontal";
import Footer from "../components/wiki/footer/FooterOld";
export default {
  components: { BaseLayout, BigSidebar, horizontal, Footer },
};
</script>
<style lang="scss" scoped>
.base-layout-outer {
  width: 100vw;
  height: 100vh;
}
.base-layout-inner {
  width: 100vw;
  height: 100vh;
}
</style>
