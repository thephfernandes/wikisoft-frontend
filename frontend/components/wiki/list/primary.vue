<template>
  <WikiCardPrimary>
    <template v-slot:header>
      <div class="card-header-title">
        <slot name:list-header></slot>
      </div>
    </template>
    <template v-slot:content>
      <div
        class="list-item-wrapper is-flex is-align-items-center is-justify-content-space-between"
        v-for="(item, i) in items"
        :key="i"
      >
        <WikiProfileVanity :name="item.name || item.full_name" :role="item.role" :id="item.id" :category="category">
          <template v-slot:action>
            <slot name="action" v-bind:item="item"></slot>
          </template>
        </WikiProfileVanity>
      </div>
    </template>
    <template v-slot:footer>
      <slot name="list-footer"></slot>
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item-wrapper {
  border-radius: 0;
  margin-bottom: 1rem;
}

.list-item-wrapper:not(:last-child) {
  border-bottom: 2px solid lightgrey;
}
</style>
