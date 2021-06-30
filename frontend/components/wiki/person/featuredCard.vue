<template>
  <WikiCardFeatured class="featured-person-card">
    <template v-slot:header>
      <nuxt-link :to="`/people/${person.full_name}`">
        <WikiProfileVanity
          :name="person.full_name"
          :profileImage="person.image"
          category="people"
        >
        </WikiProfileVanity>
      </nuxt-link>
    </template>

    <template v-slot:content>
      <p class="has-text-grey">
        {{ person.location }} · {{ person.founder_of }}
      </p>

      <WikiTextCollapsible :fullText="person.about" :charLimit="150" />
    </template>

    <template v-slot:footer>
      <WikiProfileTag :tag="person.industry" />
    </template>

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
  </WikiCardFeatured>
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
</style>