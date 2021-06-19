<template>
  <div class="employer-info-page">
    <div class="container">
      <div class="employer-info-page">
        <div class="tile is-vertical">
          <div class="tile is-parent is-vertical is-8">
            <div class="tile is-child">
              <WikiEmployerOverview class="block" :employer="employer" />
            </div>
          </div>
          <div class="tile is-parent is-vertical is-4">
            <div class="tile is-child">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployerProfilePage",

  data() {
    return {
      employerId: this.$route.params.employerID,
      employer: {},
    }
  },

  methods: {
    async getEmployer() {
      const item = await this.$directus.items("employers").read(this.employerId);
      this.employer = item.data;
    }
  },

  async created() {
    await this.getEmployer();
  }
};
</script>
