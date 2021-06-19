<template>
  <div class="full-screen-modal-container modal-card">
    <!-- <div class="profile-modal-container modal-card-head">
      <div class="profile-modal-crossbar">
        <button class="delete" aria-label="delete" @click="$emit('close')"></button>
      </div>
      <div class="profile-modal-header modal-card-title"></div>
    </div> -->
    <div class="profile-modal-form modal-card-body">
      <WikiHeaderPrimary :size="3" :semantic="1"
        >Type your name and address to be found and recieve relevant job
        offers</WikiHeaderPrimary
      >
      <b-field label="First name">
        <b-input required expanded v-model="first_name"></b-input>
      </b-field>
      <b-field label="Last name">
        <b-input required expanded v-model="last_name"></b-input>
      </b-field>
      <b-field label="Country/Region">
        <b-input required expanded v-model="country"></b-input>
      </b-field>
      <b-field label="Zip code">
        <b-input required expanded v-model="zip_code"></b-input>
      </b-field>
      <b-field label="City">
        <b-input required expanded v-model="city"></b-input>
      </b-field>
      <b-field>
        <b-button
          expanded
          type="is-primary"
          :disabled="isMissingFields"
          @click="emission"
        >
          Next
        </b-button>
      </b-field>
    </div>

    <!-- <div class="profile-modal-action-button modal-card-foot">
    </div> -->
  </div>
</template>

<script>
export default {
  name: "WikiProfileModalFormContact",
  data() {
    return {
      first_name: "",
      last_name: "",
      country: "",
      zip_code: "",
      city: "",
    };
  },
  methods: {
    emission: function () {
      this.$emit("submit", {
        public_name: `${this.first_name} ${this.last_name}`,
        country: this.country,
        zip_code: this.zip_code,
        city: this.city,
      });
    },
  },
  computed: {
    isMissingFields: function () {
      return !(
        this.first_name &&
        this.last_name &&
        this.country &&
        this.zip_code &&
        this.city
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
