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
                <b-input required expanded v-model="company"></b-input>
              </b-field>
            </b-field>

            <b-field expanded grouped position="is-centered">
              <b-field label="Official job title" expanded>
                <b-input required expanded v-model="title"></b-input>
              </b-field>

              <b-field label="Vacancies">
                <b-input
                  exponential
                  max="9999"
                  :step="1"
                  v-model="vacancies"
                  type="number"
                  min="0"
                  required
                  controls-position="compact"
                ></b-input>
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

            <b-field label="Confirm password" expanded :type="matchPasswordValidationMessage ? 'is-danger' : ''" :message="matchPasswordValidationMessage">
              <b-input
                v-model="confirmPwd"
                expanded
                type="password"
              ></b-input>
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
              <WikiTextMultiline gray>
                I confirm I represent HR, recuriting, management, PR or an
                executive branch at
                {{ company !== "" ? company : "my company" }} and I agree to
                Wikisoft's
                <NuxtLink to="/terms-of-service/">Terms of Service</NuxtLink>
                and <NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink> on
                behalf of
                {{ company !== "" ? company : "my company" }}
              </WikiTextMultiline>
            </b-field>
            <b-field expanded>
              <WikiButton @click="register" expanded :disabled="!isFormComplete || !companyConfirmed"
                >Create Account</WikiButton
              >
            </b-field>
            <b-message type="is-warning" v-if="isFormComplete && !companyConfirmed">
              Your profile isn't currently working at this company. Please register at the company you would like to create an employer account for and try again later.
            </b-message>
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
      vacancies: this.$route.query.vacancies ? this.$route.query.vacancies : 0,
      company: this.$route.query.company ? this.$route.query.company : "",
      fname: this.$route.query.fname ? this.$route.query.fname : "",
      lname: this.$route.query.lname ? this.$route.query.lname : "",
      email: this.$route.query.email ? this.$route.query.email : "",
      title: "",
      pwd: "",
      confirmPwd: "",
      checked: false,
    };
  },

  computed: {
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
        this.vacancies
      );
    },

    companyConfirmed: function () {
      return this.$auth.user.companies.find(item => item.company_name.toLowerCase() === this.company) !== undefined; 
    }
  },

  methods: {
    register: async function () {
      try {
        const employers = await this.$directus.items("employers");
        const newEmployer = await employers.create({
          name: this.fname + " " + this.lname,
          companies: {},
          // email: this.email,
          // title: this.title,
          // password: this.pwd,
          partition: "DK",
          public_id: 1,
        });

        if (newEmployer) {
          this.$router.push(`/employer/${newEmployer.data.id}`);
        }
      } catch (error) {
        console.error("failed to register employer:", error);
      }
    },
  },
};
</script>
