<template>
  <div>
    <b-modal v-model="show" has-modal-card trap-focus @close="resetTimer">
      <template v-slot:default="props">
        <div class="modal-card">
          <div class="modal-card-body">
            <WikiHeaderPrimary class="mb-2" :size="3" :semantic="1">
              Complete your profile now to recieve more relevant content
            </WikiHeaderPrimary>

            <div class="content">
              <div
                class="prompt-buttons is-flex is-justify-content-space-between"
              >
                <WikiButtonBased type="is-default" @click="props.close">
                  Not now
                </WikiButtonBased>
                <WikiButtonBased
                  type="is-primary"
                  @click="redirectCompleteProfile"
                  >Continue</WikiButtonBased
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      promptTimer: null,
      show: false,
      time: process.env.NODE_ENV === "development" ? 3 * 1000 : 5 * 60 * 1000
    };
  },

  mounted() {
    this.setTimer();
  },

  methods: {
    showPrompt() {
      this.show = true;
    },

    setTimer() {
      this.promptTimer = setTimeout(this.showPrompt, this.time);
    },

    clearTimer() {
      clearTimeout(this.promptTimer);
    },

    resetTimer() {
      this.clearTimer()
      this.setTimer();
    },

    redirectCompleteProfile() {
      this.show = false;
      this.$router.push(`/account/${this.$auth.user.id}?init=true`);
    },
  },
};
</script>

<style lang="scss" scoped>
.prompt-actions {
  width: 100%;
}
</style>