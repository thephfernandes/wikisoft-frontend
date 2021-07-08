<template>
  <WikiListPrimary :items="profiles" category="people" borderless>
    <template v-slot:header>
      <div class="list-header">
        <div class="is-flex is-justify-content-space-between">
          <WikiHeaderPrimary class="has-text-grey" :size="2" :semantic="3">
            Showing {{ !$device.isMobile ? "a total of" : "" }} {{ profiles.length }}
            {{ profiles.length !== 1 ? "people" : "person" }}
          </WikiHeaderPrimary>
          <div class="show-all-link">
            <WikiHeaderPrimary :size="2" :semantic="3">
              <nuxt-link to="/people">Show all</nuxt-link>
            </WikiHeaderPrimary>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:empty>
      <div class="is-flex is-align-items-center is-justify-content-center">
        <WikiHeaderPrimary :size="3" :semantic="3"
          ><p>No people found :/</p></WikiHeaderPrimary
        >
      </div>
    </template>

    <template v-slot:action="props">
      <WikiButtonBased
        outlined
        squared
        size="is-small"
        :type="props.item.connected ? 'is-success is-light' : 'is-success'"
      >
        <span v-if="!$device.isMobile" class="is-uppercase">{{
          props.item.connected ? "follow" : "following"
        }}</span>
        <WikiIconWicon v-else icon="plus" size="0.5" />
      </WikiButtonBased>

      <!-- <b-button
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
      </b-button> -->
    </template>
  </WikiListPrimary>
</template>

<script>
export default {
  props: {
    profiles: Array,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.list-header {
  width: 100%;
}

.list-item:not(:last-child) {
  border-bottom: 2px solid lightgrey;
}
</style>