<template>
  <WikiCardPrimary borderless>
    <template v-slot:header>
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
    </template>

    <template v-slot:content>
      <div class="featured-people-list">
        <div class="featured-people">
          <nuxt-link
            class="featured-person"
            v-for="(item, i) in people"
            :key="i"
            :to="`/people/${item.person_name}`"
          >
            <WikiPersonFeaturedCard :person="item" />
          </nuxt-link>
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
  width: 100%;
}

.featured-people {
  display: grid;

  @include mobile {
    grid-template-columns: auto;
  }

  @include desktop {
    padding: 0rem 0.25rem;
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