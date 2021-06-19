<template>
  <div v-if="!loading" :class="{ 'search-results-container-popup': true, active: active, inactive: !active }">
    <div class="search-results-wrapper" v-show="active">
      <WikiFeedHome :active="active" />
    </div>
    <div
      @click="active = false"
      class="search-results-backdrop animate__animated animate__fadeIn"
      v-show="active"
    ></div>
    <!-- <div
      @click="active = false"
      class="search-results-backdrop2 animate__animated animate__fadeIn"
      v-show="active"
    ></div>
    <div
      @click="active = false"
      class="search-results-backdrop3 animate__animated animate__fadeIn"
      v-show="active"
    ></div>
    <div
      @click="active = false"
      class="search-results-backdrop4 animate__animated animate__fadeIn"
      v-show="active"
    ></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      loading: true,
    };
  },
  mounted() {
    this.loading = false;
  },
  watch: {
    "$store.state.search.query": function (n, o) {
      if (n !== "" && n != null && n != undefined) {
        this.active = true;
      } else {
        this.active = false;
      }
    },
    $route: function (n, o) {
      this.active = false;
    },
    "$store.state.search.focused": function (n, o) {
      this.active = n ? true : false;
      // if (n) {
      //   this.active = true;
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-reults-container-popup {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
}
.search-results-wrapper {
  z-index: 201;
  &.inactive {
    z-index: 0;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  position: absolute;
  top: 90px;
  left: 0px;
  right: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  @include tablet {
    height: calc(100vh - 142px);
  }

  @include desktop {
    height: calc(100vh - 136px);
  }

  @include mobile {
    top: 110px;
    height: calc(100vh - 158px);
  }
}
.search-results-backdrop {
  z-index: 200;
  position: absolute;
  width: 100vw;
  @include desktop {
    height: calc(100vh - 120px);
  }

  @include tablet {
    height: calc(100vh - 136px);
  }

  @include mobile {
    height: calc(100vh - 136px);
  }
  top: 88px;
  bottom: 32px;
  background: rgba(0, 0, 0, 0.02);
  background-clip: padding-box;
  backdrop-filter: saturate(180%) blur(8px);
}
// .search-results-backdrop2 {
//   display: block;

//   @include mobile {
//     display: none;
//   }
//   @include tablet {
//     display: none;
//   }
//   border-radius: 4px;
//   z-index: 200;
//   position: absolute;
//   height: 78px;
//   width: calc(50vw - 288px);
//   left: 0;
//   background: rgba(0, 0, 0, 0.02);
//   background-clip: padding-box;
//   backdrop-filter: saturate(180%) blur(8px);
// }
// .search-results-backdrop3 {
//   display: block;
//   @include mobile {
//     display: none;
//   }
//   @include tablet {
//     display: none;
//   }
//   border-radius: 4px;

//   z-index: 200;
//   position: absolute;
//   right: 0;
//   height: 78px;
//   width: calc(50vw - 288px);
//   background: rgba(0, 0, 0, 0.02);
//   background-clip: padding-box;
//   backdrop-filter: saturate(180%) blur(8px);
// }
</style>
