<template>
  <WikiCardPrimary class="person-overview block">
    <template v-slot:header>
      <WikiHeaderPrimary class="card-header-title px-0" :size="3" :semantic="2">
        About {{ person.data_full_name }}
      </WikiHeaderPrimary>
    </template>

    <template v-slot:content>
      <WikiTextCollapsible
        v-if="
          person.data_description != undefined ||
          (person.data_title != undefined &&
            person.data_company_name_1 != undefined)
        "
        :fullText="
          person.data_description
            ? person.data_description
            : person.data_title + ' from ' + person.data_company_name_1
        "
        expanded
      />
      <!--
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
   -->
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
    fullName() {
      return this.person.full_name
        ? `${this.person.full_name}`
        : `${this.person.first_name} ${this.person.last_name}`;
    },
  },
};
</script>

<style></style>
