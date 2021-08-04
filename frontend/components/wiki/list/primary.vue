<template>
  <WikiCardPrimary :borderless="borderless">
    <template v-slot:header>
      <slot name="header"></slot>
    </template>
    <template v-slot:content>
      <div v-if="items.length > 0">
        <div
          class="
            list-item-wrapper
            is-flex is-align-items-center is-justify-content-space-between
          "
          v-for="(item, i) in items"
          :key="i"
        >
          <WikiProfileVanity
            :name="item.name || item.content.data_full_name"
            :role="item.role || item.content.data_title"
            :id="item.id || item.content.data_id"
            :category="category || item.content.data.company_name_1"
          >
            <template v-slot:action>
              <slot name="action" v-bind:item="item"></slot>
            </template>
          </WikiProfileVanity>
        </div>
      </div>

      <div v-else>
        <slot name="empty"></slot>
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

    borderless: {
      type: Boolean,
      default: false,
      required: false,
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
