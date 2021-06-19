<template>
  <div class="full-screen-modal-container modal-card">
    <div class="modal-card-head">
      <div class="modal-card-title">
        <WikiHeaderPrimary :size="3" :semantic="2"> Report </WikiHeaderPrimary>
      </div>
      <button
        type="button"
        class="delete"
        aria-label="delete"
        @click="$emit('close')"
      ></button>
    </div>
    <div class="modal-card-body">
      <WikiHeaderPrimary :size="2" :semantic="2"
        >Why are you reporting this profile?</WikiHeaderPrimary
      >
      <div class="report-reasons-list">
        <div
          class="report-reasons-item py-2"
          v-for="(item, i) in reasons"
          :key="i"
          @click="submitReport(item)"
        >
          <a role="button">
            {{ item }}
          </a>
        </div>
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
      reasons: [
        "It's spam",
        "Hate speech or symbols",
        "Violence or dangerous organizations",
        "Bullying or harassment",
        "Intellectual property violation",
        "Scam or fraud",
        "False information",
        "Other",
      ],
    };
  },

  methods: {
    submitReport(reason) {
      console.log(`reporting profile ${this.id} for ${reason}`);
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.report-reasons-item {
  border-bottom: 1px solid rgba(38, 38, 38, 20%);
  color: black;
}
</style>