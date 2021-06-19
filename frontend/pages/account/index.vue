<template>
  <div class="account-info-page">
    <div class="container">
      <div class="tile is-vertical" v-if="!loading">
        <div class="tile is-parent">
          <div class="tile is-child-is-8">
            <WikiCardPrimary>
              <template v-slot:header>
                <div class="card-header-title">
                  <WikiHeaderPrimary :size="4" :semantic="2">{{
                    account.public_name
                  }}</WikiHeaderPrimary>
                </div>
              </template>

              <template v-slot:content>
                <div
                  class="claimed-companies-list"
                  v-if="claimedCompanyProfiles.length > 0"
                >
                  <WikiHeaderPrimary :size="3" :semantic="2"
                    >claimed companies</WikiHeaderPrimary
                  >
                  <div
                    v-for="item in claimedCompanyProfiles"
                    :key="item.company_id"
                  >
                    <nuxt-link :to="`/companies/${item.company_id}`">
                      <div class="card-header-title">
                        {{ item.name }}
                      </div>
                      <div class="card-content">
                        <p class="has-text-black">
                          {{ item.description }}
                        </p>
                      </div>
                    </nuxt-link>
                    <hr />
                  </div>
                </div>

                <br />

                <div
                  class="claimed-people-list"
                  v-if="claimedPeopleProfiles.length > 0"
                >
                  <WikiHeaderPrimary :size="3" :semantic="2"
                    >claimed people</WikiHeaderPrimary
                  >
                  <div
                    v-for="item in claimedPeopleProfiles"
                    :key="item.person_id"
                  >
                    <nuxt-link :to="`/people/${item.person_id}`">
                      <div class="card-header-title">
                        {{ item.data_full_name }}
                      </div>
                      <div class="card-content">
                        <p class="has-text-black">
                          {{ item.data_current_job }}
                        </p>
                      </div>
                    </nuxt-link>
                    <hr />
                  </div>
                </div>
              </template>
            </WikiCardPrimary>
          </div>
        </div>
      </div>
      <div class="tile is-child" v-else>
        <b-progress class="mt-5 px-5"></b-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountPage",

  middleware: "auth",
  
  data() {
    return {
      loading: false,
    };
  },

  computed: {
    account() {
      return this.$store.getters["user/getAccount"];
    },

    claimedCompanyProfiles() {
      return this.$store.getters["companies/getClaimedCompanies"];
    },

    claimedPeopleProfiles() {
      return this.$store.getters["people/getClaimedPeople"];
    },
  },

  methods: {
    async getAccount() {
      const response = await this.$directus
        .items("accounts")
        .read(this.$auth.user.account_id);
      if (response.data) {
        return response.data;
      }
      return;
    },
  },

  async created() {
    this.loading = true;
    await this.$store.dispatch("user/fetchAccount");
    await this.$store.dispatch("companies/fetchClaimedCompanies");
    await this.$store.dispatch("people/fetchClaimedPeople");
    this.loading = false;
  },
};
</script>
