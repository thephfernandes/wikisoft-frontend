<template>
  <WikiCardFeatured class="featured-person-card">
    <template v-slot:header>
      <a @click="redirectToPersonProfile()">
        <WikiProfileVanity
          :name="person.full_name"
          :profileImage="person.image"
          category="people"
        >
        </WikiProfileVanity>
      </a>
    </template>

    <template v-slot:content>
      <p class="has-text-grey">
        {{ person.location }} · {{ person.founder_of }}
      </p>

      <WikiTextCollapsible class="big-gay" :fullText="person.about" :charLimit="150" redirect category="people" :id="person.full_name"/>
    </template>

    <template v-slot:footer>
      <WikiProfileTag :tag="industries[0]" />
    </template>

    <template v-slot:action>
      <WikiButtonBased
        outlined
        :size="$device.isMobile ? 'is-small' : ''"
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

  methods: {
    redirectToPersonProfile() {
      this.$store.commit("people/setIsFeatured", true);
      this.$router.push(`/people/${this.person.full_name}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.follow-button {
  border-radius: 3px;
}
</style>