<template>
  <div class="company-stats">
    <div class="stat-item" v-for="(value, name, index) in stats" :key="index">
      <div class="stat-value">
        <span class="is-uppercase has-text-weight-semibold">
          {{ value }}
        </span>
      </div>
      <div class="stat-name">
        <span class="is-uppercase has-text-weight-semibold has-text-grey">
          {{ name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      stats: {
        reviews: "1.2K",
        jobs: "765",
        salaries: "1.2K",
        interviews: "336",
        benefits: "18",
        photos: "45",
      },
    };
  },

  methods: {
    async getCompanyStats() {
      //some query here...
    },
  },

  async created() {
    await this.getCompanyStats();
  },
};
</script>

<style lang="scss" scoped>
.company-stats {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;

  > :not(:last-child) {
    border-right: 1px solid lightgrey;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.stat-value {
  color: $logo-blue;
}
</style>