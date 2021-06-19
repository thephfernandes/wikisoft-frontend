<template>
  <div>
    <b-collapse :open="false">
      <template v-slot:trigger>
        <div
          class="item is-flex is-justify-content-space-between is-align-items-center"
        >
          <div class="item-description">
            <WikiHeaderPrimary id="header" :semantic="1" :size="2"
              >Name, Location and industry</WikiHeaderPrimary
            >
            <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
              Choose how your name and profile fields appear to other members
            </WikiHeaderPrimary>
          </div>
          <div class="item-action">
            <a role="button">
              <span class="has-text-grey has-text-weight-medium"> Change </span>
            </a>
          </div>
        </div>
      </template>
      <b-field label="First name">
        <b-input  @input="emitFormChange" v-model="first_name"></b-input>
      </b-field>
      <b-field label="Last name">
        <b-input @input="emitFormChange" v-model="last_name"></b-input>
      </b-field>
      <b-field label="Industry">
        <b-input @input="emitFormChange" v-model="industry"></b-input>
      </b-field>
    </b-collapse>
    <!-- <hr />
     <div class="item is-flex is-justify-content-space-between is-align-items-center">
      <div class="item-description">
        <WikiHeaderPrimary id="header" :semantic="1" :size="2"
          >Show profile photos</WikiHeaderPrimary
        >
        <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
          Chose whether to show or hide profile photos of other members
        </WikiHeaderPrimary>
      </div>
      <div class="item-action">
        <b-switch
          class="mr-0"
          :disabled="$auth.user == null"
          :value.sync="tfaSecret"
          @input="emitFormChange"
        />
      </div>
    </div>
    <hr />

    <b-collapse :open="false">
      <template v-slot:trigger>
        <div
          class="item is-flex is-justify-content-space-between is-align-items-center"
        >
          <div class="item-description">
            <WikiHeaderPrimary id="header" :semantic="1" :size="2"
              >Feed preferences</WikiHeaderPrimary
            >
            <WikiHeaderPrimary gray id="header" :semantic="1" :size="2">
              Customize your feed
            </WikiHeaderPrimary>
          </div>
          <div class="item-action">
            <span class="rhs-bfield-profile">
              <a role="button">
                <span class="has-text-grey has-text-weight-medium">
                  Change
                </span>
              </a>
            </span>
          </div>
        </div>
      </template>
      <p>Coming soon!</p>
    </b-collapse> -->
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "WikiPersonFormsProfile",

  props: {
    person: {
      type: Object,
      default: {},
      required: true,
    }
  },

  data() {
    return {
      first_name: this.person.first_name,
      last_name: this.person.last_name,
      industry: this.person.industry,
    }
  },

  created() {
    this.emitFormChange = _.debounce(this.emitFormChange, 300);
  },

  methods: {
    emitFormChange() {
      this.$emit("input", {
        first_name: this.first_name,
        last_name: this.last_name,
        industry: this.industry,
      });
    },
  },

  computed: {
    tfaSecret() {
      return this.$auth.tfa_secret;
    },
  },
};
</script>
<style lang="scss" scoped>
.item:first-child {
  margin-top: 1.5rem;
}
</style>
