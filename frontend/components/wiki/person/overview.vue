<template>
  <WikiCardPrimary class="person-overview block">
    <template v-slot:header>
      <WikiHeaderPrimary class="card-header-title px-0" :size="3" :semantic="2">
        About {{ person.full_name }}
      </WikiHeaderPrimary>
    </template>

    <template v-slot:content>
      <WikiTextCollapsible :fullText="person.about" expanded />

      <div class="person_net-worth" v-if="person.net_worth">
        <WikiHeaderPrimary
          class="card-header-title px-0"
          :size="3"
          :semantic="2"
        >
          Net worth
        </WikiHeaderPrimary>
        <p class="has-text-weight-medium">
          Estimated at {{ person.net_worth }}
        </p>
      </div>
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
};
</script>

<style>
</style>