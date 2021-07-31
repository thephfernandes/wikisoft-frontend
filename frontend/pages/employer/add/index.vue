<template>
  <div class="employer-page container">
    <div class="tile is-4-fullhd block">
      <div class="tile is-child">
        <WikiCardPrimary>
          <template v-slot:header>
            <div class="card-header-title">
              <WikiHeaderPrimary :semantic="5" :size="3">
                Create employer account
              </WikiHeaderPrimary>
            </div>
          </template>
          <template v-slot:content>
            <b-field grouped position="is-centered">
              <b-field label="First Name" expanded>
                <b-input required v-model="fname" expanded></b-input>
              </b-field>
              <b-field label="Last Name" expanded>
                <b-input required v-model="lname" expanded></b-input>
              </b-field>
            </b-field>

            <b-field expanded grouped position="is-centered">
              <b-field label="Company" expanded>
                <b-autocomplete
                  v-if="!userCompany"
                  required
                  expanded
                  v-model="company"
                  field="name"
                  :data="suggestedCompanies"
                  clearable
                  placeholder="your current company"
                  @input="fetchEmployerAutocompleteCompanies"
                  @select="setSelectedCompany"
                >
                  <template v-slot="props">
                    <div
                      class="
                        company-item
                        is-flex is-align-items-flex-start
                        py-2
                      "
                    >
                      <div class="company-logo mr-2">
                        <figure>
                          <img :src="props.option.logo" />
                        </figure>
                      </div>

                      <div class="company-name">
                        <strong>{{ props.option.name }}</strong>
                      </div>
                    </div>
                  </template>
                  <template v-slot:empty>
                    <p>No results found</p>
                  </template>
                  <template v-slot:footer>
                    <hr class="mt-0 mb-2"/>
                    <nuxt-link to="/companies/add">My company isn't on Wikiprofile</nuxt-link>
                  </template>
                </b-autocomplete>
                <b-autocomplete v-else :value="userCompany.name" disabled></b-autocomplete>
              </b-field>
            </b-field>

            <b-field expanded grouped position="is-centered">
              <b-field label="Official job title" expanded>
                <b-input required expanded v-model="title"></b-input>
              </b-field>
            </b-field>
          </template>
        </WikiCardPrimary>
      </div>
    </div>
    <div class="tile is-4-fullhd block">
      <div class="tile is-child">
        <WikiCardPrimary>
          <template v-slot:header>
            <div class="card-header-title">
              <WikiHeaderPrimary :semantic="5" :size="3">
                Account details
              </WikiHeaderPrimary>
            </div>
          </template>
          <template v-slot:content>
            <b-field label="Work Email Address" expanded>
              <b-input required v-model="email" expanded></b-input>
            </b-field>
            <b-field label="Password" expanded>
              <b-input
                required
                v-model="pwd"
                expanded
                type="password"
                validation-message="Minimum eight characters, at least one letter, one number and one special character"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                password-reveal
              ></b-input>
            </b-field>

            <b-field
              label="Confirm password"
              expanded
              :type="matchPasswordValidationMessage ? 'is-danger' : ''"
              :message="matchPasswordValidationMessage"
            >
              <b-input v-model="confirmPwd" expanded type="password"></b-input>
            </b-field>
          </template>
        </WikiCardPrimary>
      </div>
    </div>
    <div class="tile is-4-fullhd block">
      <div class="tile is-child">
        <WikiCardPrimary>
          <template v-slot:header>
            <div class="card-header-title">
              <WikiHeaderPrimary :semantic="5" :size="3">
                Confirm registration
              </WikiHeaderPrimary>
            </div>
          </template>
          <template v-slot:content>
            <b-field expanded>
              <b-checkbox v-model="checked" expanded></b-checkbox>
              <WikiTextMultiLine gray>
                I confirm I represent HR, recuriting, management, PR or an
                executive branch at
                {{ company !== "" ? company : "my company" }} and I agree to
                Wikisoft's
                <NuxtLink to="/terms-of-service/">Terms of Service</NuxtLink>
                and <NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink> on
                behalf of
                {{ company !== "" ? company : "my company" }}
              </WikiTextMultiLine>
            </b-field>
            <b-field expanded>
              <WikiButton
                @click="register"
                expanded
                :disabled="!isFormComplete || !companyConfirmed"
                >Create Account</WikiButton
              >
            </b-field>
            <b-message
              type="is-warning"
              v-if="isFormComplete && !companyConfirmed"
            >
              Your profile isn't currently working at this company. Please
              register at the company you would like to create an employer
              account for and try again later.
            </b-message>
          </template>
        </WikiCardPrimary>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      company: this.$route.query.company ? this.$route.query.company : "",
      fname: this.$route.query.fname ? this.$route.query.fname : "",
      lname: this.$route.query.lname ? this.$route.query.lname : "",
      email: this.$route.query.email ? this.$route.query.email : "",
      title: "",
      pwd: "",
      confirmPwd: "",
      checked: false,
      suggestedCompanies: [],
      current_company: "",
    };
  },

  computed: {
    ...mapGetters({ userCompany: "companies/getSelectedCompany" }),

    full_name: function () {
      return `${this.fname} ${this.lname}`;
    },

    passwordsMatch: function () {
      return this.pwd === this.confirmPwd;
    },

    matchPasswordValidationMessage: function () {
      if (!this.pwd) {
        return;
      }

      if (!this.confirmPwd) {
        return "Please fill out this field";
      }

      if (!this.passwordsMatch) {
        return "Passwords don't match";
      }
    },

    formData: function () {
      return {
        first_name: this.fname,
        last_name: this.lname,
        current_company: this.current_company,
        company_email: this.email,
      };
    },

    isFormComplete: function () {
      return (
        this.checked &&
        this.fname &&
        this.lname &&
        this.title &&
        this.company &&
        this.email &&
        this.pwd &&
        this.passwordsMatch &&
        this.current_company
      );
    },

    companyConfirmed: function () {
      return (
        this.$auth.user.companies.find(
          (item) => item === this.current_company
        ) !== undefined
      );
    },
  },

  methods: {
    async fetchEmployerAutocompleteCompanies() {
      await this.$store.dispatch("companies/fetchCompanies", this.company);
      this.suggestedCompanies = this.$store.getters["companies/getCompanies"];
    },

    setSelectedCompany(company) {
      if (company) {
        this.current_company = company.id;
      } else {
        this.current_company = "";
      }
    },

    register: async function () {
      await this.$store.dispatch("user/createEmployer", this.formData).then(
        this.$router.push("/")
      );
    },
  },

  created() {
    this.fetchEmployerAutocompleteCompanies = _.debounce(
      this.fetchEmployerAutocompleteCompanies,
      300
    );
  },

  async mounted() {
    await this.$store.dispatch("companies/fetchSelectedCompany", this.$auth.user.current_company);
  }
};
</script>
