<template>
  <div class="full-screen-modal-container modal-card">
    <div class="profile-modal-form modal-card-body">
      <WikiHeaderPrimary :size="3" :semantic="3" class="has-text-centered mb-2"
        >Add your job and eduction so people can find you</WikiHeaderPrimary
      >
      <b-field label="Most recent job title">
        <b-input required expanded v-model="job"></b-input>
      </b-field>
      <b-field label="Most recent company">
        <b-input required expanded v-model="company"></b-input>
      </b-field>
      <div>
        <b-switch class="mr-3" v-model="is_student">I'm a student</b-switch>
        <b-switch v-model="is_over_16">I'm over 16</b-switch>
      </div>
      <b-field label="School or College/University">
        <b-input required expanded v-model="school"></b-input>
      </b-field>
      <b-field label="Degree">
        <b-input required expanded v-model="degree"></b-input>
      </b-field>
      <!-- <b-field label="Specialization">
        <b-input v-model="specialization" required expanded></b-input>
      </b-field> -->
      <b-field expanded grouped>
        <b-field label="Start year" expanded>
          <b-datepicker
            position="is-top-left"
            type="month"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
            required
            v-model="start_year"
          >
          </b-datepicker>
        </b-field>
        <b-field label="End year" expanded>
          <b-datepicker
            position="is-top-right"
            type="month"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
            required
            v-model="ending_year"
          >
          </b-datepicker>
        </b-field>
      </b-field>
      <b-button
        expanded
        type="is-primary"
        :disabled="isMissingFields"
        @click="emission"
      >
        Next
      </b-button>
    </div>
    <!-- <div class="profile-modal-action-button modal-card-foot">
      <b-button expanded type="is-primary" @click="emission"> Next </b-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: "",
      company: "",
      is_student: false,
      school: "",
      degree: "",
      specialization: "",
      start_year: new Date(),
      ending_year: new Date(),
      is_over_16: false,
    };
  },

  computed: {
    isMissingFields() {
      return !(
        this.job &&
        this.company &&
        this.school &&
        this.degree &&
        this.start_year &&
        this.ending_year
      );
    },
  },

  methods: {
    emission: function () {
      this.$emit("submit", {
        job: this.job,
        company: this.company,
        is_student: this.is_student,
        school: this.school,
        degree: this.degree,
        starting_year: this.start_year,
        ending_year: this.ending_year,
        is_over_16: this.is_over_16,
      });
    },
  },
};
</script>

<style></style>
