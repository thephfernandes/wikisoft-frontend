<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <WikiTextMultiLine class="mb-1" v-if="completionProgress < 1"
      >Complete your profile to see more relevant feed updates and get more
      profile views.</WikiTextMultiLine
    >
    <p class="profile-strength-status is-size-6">
      <span class="has-text-grey"> Profile Strength: </span>
      <span class="has-text-weight-semibold">
        {{ profileLevel }}
      </span>
    </p>

    <div class="progress-bar is-flex">
      <div
        class="progress-bar__step progress-bar__step--completed"
        v-for="(item, i) in numFields - numMissingFields"
        :key="i"
      ></div>
      <div
        class="progress-bar__step progress-bar__step--empty"
        v-for="(item, i) in numMissingFields"
        :key="i"
      ></div>

      <div class="profile-complete-badge">
        <WikiIconWicon
          class="profile-complete-icon"
          icon="check"
          size="is-small"
        />
      </div>
    </div>

    <div class="complete-profile-prompt" v-if="completionProgress < 1">
      <WikiButtonBased class="is-primary"><span class="is-uppercase">finish your profile</span></WikiButtonBased>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
    };
  },

  computed: {
    profileFields() {
      const user = this.$auth.user;
      return (({
        avatar,
        current_company,
        description,
        industry,
        job_title,
      }) => ({ avatar, current_company, description, industry, job_title }))(
        user
      );
    },

    numFields() {
      return Object.keys(this.profileFields).length;
    },

    numMissingFields() {
      return Object.keys(this.profileFields).filter(
        (key) => !this.profileFields[key]
      ).length;
    },

    completionProgress() {
      return (this.numFields - this.numMissingFields) / this.numFields;
    },

    profileLevel() {
      if (this.completionProgress <= 0.3) {
        return "Novice";
      }

      if (this.completionProgress <= 0.6) {
        return "Intermediate";
      }

      if (this.completionProgress <= 0.8) {
        return "Advanced";
      }

      if (this.completionProgress === 1) {
        return "Complete";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 2px;
  background-color: rgb(5, 118, 66);
  margin-top: 1rem;
  margin-bottom: 1rem;

  .progress-bar__step {
    flex-grow: 1;
    border-right: 2px solid rgba(0, 0, 0, 0.6);
  }

  .progress-bar__step:first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 2px 0 0 2px;
  }

  .progress-bar__step--completed:first-child {
    border: 0;
  }

  .progress-bar__step--completed {
    border-right: 2px solid rgb(5, 118, 66);
    border-left: 2px solid whitesmoke;
  }

  .progress-bar__step--empty {
    background-color: white;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  .progress-bar__step--empty:last-child {
    border-right: 1px solid black;
  }
}

.profile-complete-badge {
  position: absolute;
  right: 0;
  top: 50%;
  border-radius: 100%;
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: white;
  color: rgb(5, 118, 66);
  padding: 0.1rem;
  transform: translate(50%, -55%);
}
</style>