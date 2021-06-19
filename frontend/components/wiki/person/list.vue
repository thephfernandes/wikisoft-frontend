<template>
  <WikiListPrimary :items="profiles" category="people">
    <template v-slot:action="props">
      <b-button
        :class="props.item.connected ? 'is-success is-light' : 'is-success'"
      >
        <div class="mobile-icon">
          <b-icon :icon="props.item.connected ? 'telegram' : 'plus'"> </b-icon>
        </div>

        <div class="desktop-text">
          <span class="is-uppercase is-size-6-mobile">{{
            props.item.connected ? "message" : "connect"
          }}</span>
        </div>
      </b-button>
    </template>
  </WikiListPrimary>
</template>

<script>
export default {
  name: "WikiPersonList",

  props: {
    profiles: Array,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.list-item:not(:last-child) {
  border-bottom: 2px solid lightgrey;
}

.mobile-icon {
  @include desktop {
    display: none;
  }
}

.desktop-text {
  @include tablet {
    display: none;
  }

  @include mobile {
    display: none;
  }
}
</style>