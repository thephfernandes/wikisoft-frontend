<template>
  <WikiCardPrimary class="featured-person-card">
    <template v-slot:header>
      <WikiProfileVanity
        :name="person.full_name"
        :profileImage="person.image"
        category="people"
      >
        <template v-slot:action>
          <WikiButtonBased
            outlined
            squared
            type="is-success is-light"
            class="follow-button"
          >
            <span class="is-uppercase">follow</span>
          </WikiButtonBased>
        </template>
      </WikiProfileVanity>
    </template>
    <template v-slot:content>
      <p class="has-text-weight-semibold pb-2">
        {{ person.location }} · {{ person.founder_of }}
      </p>

      <WikiTextCollapsible :fullText="person.about" :charLimit="150" />

      <!-- <div class="py-3">
        <div class="person-industry-tags is-flex">
          <div
            class="person-industry-tag mr-3"
            v-for="(item, i) in industries"
            :key="i"
          >
            <span class="has-text-weight-semibold">{{ item }}</span>
          </div>
        </div>
      </div> -->
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  computed: {
    industries() {
      return this.person.industry.split(",");
    },
  },
};
</script>

<style lang="scss" scoped>
.person-industry-tag {
  background-color: aliceblue;
  color: royalblue;
  padding: 0.5rem 1rem;
}

.featured-person-card {
  @include desktop {
    min-height: 350px;
  }
}
</style>