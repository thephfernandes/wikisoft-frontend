<template>
  <div class="create-company-page container">
    <div class="tile is-4-fullhd block">
      <div class="tile is-child">
        <WikiCardPrimary>
          <template v-slot:content>
            <WikiHeaderPrimary class="has-text-black" :size="2" :semantic="3">
              Page Identity
            </WikiHeaderPrimary>
            <b-field label="Name" expanded>
              <b-input required v-model="companyName" expanded></b-input>
            </b-field>
            <b-field label="Wikiprofile public url">
              <p class="control mr-2">wikiprofile.com/company/</p>
              <b-input v-model="publicURL" expanded></b-input>
            </b-field>
            <b-field label="Website" expanded>
              <b-input v-model="companyWebsite" expanded></b-input>
            </b-field>
            <b-field>
              <b-checkbox v-model="noWebsite"></b-checkbox>
              <WikiTextMultiLine gray
                >My organization doesn't have a website</WikiTextMultiLine
              >
            </b-field>

            <hr />

            <WikiHeaderPrimary class="has-text-black" :size="2" :semantic="3">
              Company Details
            </WikiHeaderPrimary>
            <b-field label="Industry" expanded>
              <b-select
                placeholder="Select Industry"
                required
                expanded
              ></b-select>
            </b-field>
            <b-field label="Company Size" expanded>
              <b-select
                placeholder="Select Company Size"
                required
                expanded
              ></b-select>
            </b-field>
            <b-field label="Company Type" expanded>
              <b-select
                placeholder="Select Company Type"
                required
                expanded
              ></b-select>
            </b-field>

            <hr />

            <WikiHeaderPrimary class="has-text-black" :size="2" :semantic="3">
              Profile Details
            </WikiHeaderPrimary>
            <b-field label="Logo">
              <b-upload
                v-model="logo"
                expanded
                drag-drop
                style="position: relative"
              >
                <div class="tag px-1 py-1" style="visibility: hidden;">Choose file</div>

                <div class="choose-file tag px-1 py-1 has-text-weight-semibold">Choose file</div>
                <!-- <WikiButtonBased> Choose file </WikiButtonBased> -->
              </b-upload>
            </b-field>

            <b-field label="Company description">
              <b-input type="textarea" maxlength="500"></b-input>
            </b-field>

            <hr />

            <b-field>
              <b-checkbox v-model="authorized"></b-checkbox>
              <WikiTextMultiLine gray>
                I verify that I am authorized in this company to create and
                manage this page. The company and I agree to the Wikiprofile
                terms of service.
              </WikiTextMultiLine>
            </b-field>
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
      companyName: "",
      publicURL: "",
      companyWebsite: "",
      noWebsite: false,
      logo: null,
      authorized: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.choose-file {
  border-radius: 1px;
  color: $logo-blue;
  background: lightblue;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
}
</style>
