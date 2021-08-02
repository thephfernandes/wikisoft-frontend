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
                  v-if="!hasCompany"
                  v-model="company"
                  required
                  expanded
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
                  <!-- <template v-slot:footer>
                    <hr class="mt-0 mb-2" />
                    <nuxt-link to="/companies/add"
                      >My company isn't on Wikiprofile</nuxt-link
                    >
                  </template> -->
                </b-autocomplete>
                <b-autocomplete
                  v-else
                  :value="currentCompany"
                  disabled
                ></b-autocomplete>
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
              v-if="current_company && isFormComplete && !companyConfirmed"
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
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      claimedCompany: this.$route.query?.company,
      company: "",
      fname: this.$auth.user.first_name,
      lname: this.$auth.user.last_name,
      email: this.$auth.user.email,
      title: "",
      pwd: "",
      confirmPwd: "",
      checked: false,
      current_company: "",
    };
  },

  computed: {
    ...mapGetters({
      userCompany: "companies/getSelectedCompany",
      suggestedCompanies: "companies/getCompanies",
    }),

    hasCompany() {
      return !(!this.userCompany.id && !this.$auth.user.current_company_name);
    },

    currentCompany() {
      return this.$auth.user.current_company_name || this.userCompany.name;
    },

    companyConfirmed() {
      if (this.hasCompany) {
        if (!this.$auth.user.current_company_name) {
          return (
            this.$auth.user.companies.find(
              (item) => item === this.current_company
            ) !== undefined
          );
        } else {
          return (
            this.current_company.name.toLowerCase() ===
            this.$auth.user.current_company_name.toLowerCase()
          );
        }
      }
      return true;
    },

    passwordsMatch() {
      return this.pwd === this.confirmPwd;
    },

    matchPasswordValidationMessage() {
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

    formData() {
      if (this.userCompany.id) {
        return {
          first_name: this.fname,
          last_name: this.lname,
          current_company: this.current_company,
          company_email: this.email,
        };
      } else {
        return {
          first_name: this.fname,
          last_name: this.lname,
          current_company_name: this.company || this.current_company.name,
          company_email: this.email,
        };
      }
    },

    isFormComplete() {
      return !(
        !this.checked ||
        !this.fname ||
        !this.lname ||
        !this.title ||
        !this.email ||
        !this.pwd ||
        !this.passwordsMatch ||
        !(this.current_company || this.company)
      );
    },
  },

  methods: {
    ...mapMutations({ setSelectedCompany: "companies/setSelectedCompany "}),
    
    async fetchEmployerAutocompleteCompanies(value) {
      if (value) {
        await this.$store.dispatch("companies/fetchCompanies", {
          search: value,
        });
      }
    },

    setSelectedCompany(company) {
      this.current_company = company;
    },

    async register() {
      await this.$store
        .dispatch("user/createEmployer", this.formData)
        .then(() => {
          if (this.$auth.user.current_company) {
            this.$router.push(`companies/${this.$auth.user.current_company}`);
          } else if (this.$auth.user.current_company_name) {
            this.$router.push(
              `companies/${this.$auth.user.current_company_name}`
            );
          } else {
            console.log(this.$auth.user);
            return;
          }
        });
    },
  },

  created() {
    this.fetchEmployerAutocompleteCompanies = _.debounce(
      this.fetchEmployerAutocompleteCompanies,
      300
    );
  },

  async mounted() {
    if (this.$auth.user.current_company) {
      await this.$store.dispatch(
        "companies/fetchSelectedCompany",
        this.$auth.user.current_company
      );
      this.current_company = this.$auth.user.current_company;
    }

    if (this.claimedCompany) {
      await this.$store.dispatch(
        "companies/fetchSelectedCompany",
        this.claimedCompany
      );
    }
  },
};
</script>
