<template>
  <WikiCardPrimary borderless>
    <template v-slot:header>
      <div class="list-header">
        <div class="is-flex is-justify-content-space-between">
          <WikiHeaderPrimary class="has-text-grey" :size="2" :semantic="3">
            Showing {{ !$device.isMobile ? "a total of" : "" }}
            {{ people.length }}
            {{ people.length !== 1 ? "people" : "person" }}
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
        <div v-if="people.length > 0">
          <div class="featured-people">
            <!-- <nuxt-link
            class="featured-person"
            
            :to="`/people/${item.person_name}`"
          >
            <WikiPersonFeaturedCard v-for="(item, i) in people"
            :key="i" :person="item" />
          </nuxt-link> -->
            <WikiPersonFeaturedCard
              v-for="(item, i) in people"
              :key="i"
              :person="item"
              class="featured-person"
            />
          </div>
        </div>
        <div
          class="is-flex is-align-items-center is-justify-content-center"
          v-else
        >
          <WikiHeaderPrimary :size="3" :semantic="3"
            ><p>No people found :/</p></WikiHeaderPrimary
          >
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
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    grid-gap: 0.5rem;
  }
}

.featured-person {
  margin-left: auto;
  margin-right: auto;
}

@include desktop {
  /* Hide scrollbar for IE, Edge and Firefox */
  .featured-people::-webkit-scrollbar {
    display: none;
  }
}
</style>