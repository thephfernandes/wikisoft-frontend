<template>
  <div class="employer-get-account-page container">
    <div class="columns">
      <div class="column is-8-desktop">
        <WikiCardPrimary>
          <template v-slot:content>
            <div class="form-subgroup">
              <WikiHeaderPrimary :semantic="5" :size="3">
                Page identity
              </WikiHeaderPrimary>
              <b-field label="Name" expanded>
                <b-input required v-model="name" expanded></b-input>
              </b-field>
              <b-field label="Wikiprofile Public URL" expanded>
                <b-input required v-model="publicUrl"></b-input>
              </b-field>
              <b-field label="Website" expanded>
                <b-input required v-model="website"></b-input>
              </b-field>
            </div>

            <div class="form-subgroup">
              <WikiHeaderPrimary :semantic="5" :size="3">
                Company Details
              </WikiHeaderPrimary>
              <b-field label="Industry">
                <b-select
                  required
                  v-model="industry"
                  placeholder="Select Industry"
                  expanded
                >
                  <option disabled></option
                ></b-select>
              </b-field>
              <b-field label="Company Size">
                <b-select
                  required
                  v-model="companySize"
                  placeholder="Select Company Size"
                  expanded
                >
                  <option disabled value=""></option>
                  <option>1-50</option>
                  <option>51-200</option>
                  <option>201-500</option>
                  <option>501-1000</option>
                  <option>1001-5000</option>
                  <option>5001-10000</option>
                  <option>>10000</option>
                </b-select>
              </b-field>
              <b-field label="Company Type">
                <b-select
                  required
                  v-model="companyType"
                  placeholder="Select Company Type"
                  expanded
                >
                  <option disabled></option
                ></b-select>
              </b-field>
            </div>

            <div class="form-subgroup">
              <WikiHeaderPrimary :semantic="5" :size="3">
                Profile Details
              </WikiHeaderPrimary>
              <b-field label="Logo">
                <b-upload v-model="file" expanded>
                  <a class="button is-fullwidth">
                    <b-icon icon="upload"></b-icon>
                    <span>{{ file.name || "Click to upload" }}</span>
                  </a>
                </b-upload>
              </b-field>
              <b-field label="Company Description">
                <b-input
                  type="textarea"
                  required
                  placeholder="Minimum 50 words"
                  expanded
                ></b-input>
              </b-field>
            </div>

            <b-field>
              <b-checkbox v-model="checked"></b-checkbox>
              <WikiTextMultiline gray>
                I verify that I am authorized in this company and manage this
                page. The company and I agree to the Wikiprofile terms of
                service.
              </WikiTextMultiline>
            </b-field>
          </template>
        </WikiCardPrimary>
        <div class="form-actions is-flex is-justify-content-flex-end">
          <WikiButton class="mr-2" outlined>Cancel</WikiButton>
          <WikiButton class="mr-2" style="is-primary" :disabled="isMissingFields">Create Page</WikiButton>
        </div>
      </div>

      <div class="column is-4-desktop">
        <WikiCardPrimary>
          <template v-slot:header>
            <div class="card-header-title">
              <div class="wrapper is-flex is-flex-direction-column">
                <WikiIconWicon class="my-2" icon="lightbulb-on-outline" size="large" />
                <WikiHeaderPrimary :semantic="5" :size="3">
                  Create your Company Account
                </WikiHeaderPrimary>
              </div>
            </div>
          </template>
          <template v-slot:content>
            <WikiTextMultiLine>
              Use unique content in your company description to ensure your
              company is found on search engines.
            </WikiTextMultiLine>
          </template>
        </WikiCardPrimary>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      publicUrl: "",
      website: "",
      industry: "",
      companySize: "",
      companyType: "",
      checked: false,
      file: {},
    };
  },

  computed: {
      isMissingFields: function () {
          return !(this.name && this.publicUrl && this.website && this.industry && this.companySize && this.companyType && this.checked);
      }
  }
};
</script>

<style lang="scss" scoped>
.form-subgroup {
  padding-bottom: 2em;
  margin-bottom: 2em;
  border-bottom: 2px solid $boundingbox-border-primary-col;
}
</style>