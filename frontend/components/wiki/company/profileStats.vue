<template>
  
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  methods: {
    async getCompanyStats() {
      //some query here...
    },
  },

  async created() {
    await this.getCompanyStats();
  }
};
</script>

<style>
</style>