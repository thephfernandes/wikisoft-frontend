<template>
  <WikiCardPrimary>
    <template v-slot:content>
      <div class="featured-people-list block">
        <div class="list-header">
          <div class="is-flex is-justify-content-space-between">
            <WikiHeaderPrimary class="has-text-grey" :size="2" :semantic="3">
              Showing a total of {{ people.length }} people
            </WikiHeaderPrimary>
            <div class="show-all-link">
              <WikiHeaderPrimary :size="2" :semantic="3">
                <nuxt-link to="/people">Show all</nuxt-link>
              </WikiHeaderPrimary>
            </div>
          </div>
        </div>
        <div class="featured-people">
          <div class="featured-person" v-for="(item, i) in people" :key="i">
            <WikiPersonFeaturedCard :person="item" />
          </div>
        </div>
      </div>
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list-header {
  padding: 0.5em;
}

.featured-people {
  display: grid;

  @include mobile {
    grid-template-columns: auto;
  }

  @include desktop {
    max-height: 125vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

@include desktop {
  /* Hide scrollbar for IE, Edge and Firefox */
  .featured-people::-webkit-scrollbar {
    display: none;
  }
}
</style>