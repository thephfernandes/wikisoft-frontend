<template>
  <div class="paginated-list tile is-parent is-vertical">
    <div class="tile is-child">
      <slot name="list" :items="items"></slot>
    </div>
    <div class="tile is-child">
      <!-- <b-pagination
        :total="total"
        v-model:current="current"
        :per-page="perPage"
      ></b-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: [],
  },

  data() {
    return {
      current: 1,
      perPage: 5,
    };
  },

  computed: {
    total() {
      return this.items.length;
    },

    paginatedItems() {
      const pageNumber = this.current - 1;
      return this.items.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },
  },
};
</script>

<style>
</style>