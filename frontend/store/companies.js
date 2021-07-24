import featuredCompaniesData from "~/assets/data/featured-companies.json";

export const state = () => ({
  companies: [],
  claimedCompanies: [],
  selectedCompany: {},
  featuredCompanies: featuredCompaniesData,
  isFeatured: false,
});

export const getters = {
  getCompanies: (state) => {
    return state.companies;
  },

  getClaimedCompanies: (state) => {
    return state.claimedCompanies;
  },

  getSelectedCompany: (state) => {
    return state.selectedCompany;
  },

  getFeaturedCompanies: (state) => {
    return state.featuredCompanies;
  },

  getIsFeatured: (state) => {
    return state.isFeatured;
  }
};

export const mutations = {
  setCompanies(state, payload) {
    state.companies = payload;
  },

  setClaimedCompanies(state, payload) {
    state.claimedCompanies = payload;
  },

  setSelectedCompany(state, payload) {
    state.selectedCompany = payload;
  },

  setIsFeatured(state, payload) {
    state.isFeatured = payload;
  }
};

export const actions = {
  async fetchCompanies({ commit, rootState }, query) {
    try {
      let response = {};
      if (query) {
        response = await this.$axios.get(`/custom/search/company/${query}`);
      } else {
        response = await this.$axios.get(`/custom/search/company/${rootState.search.query}`);
      }

      // const companies = await this.$directus.items("companies");
      // let response = {};
      // if (query) {
      //   response = await companies.read(query);
      // } else {
      //   response = await companies.read({
      //     search: rootState.search.query
      //   })
      // }

      if (response.data) {
        if (response.data[0]?.search.results.length > 0) {
          const companies = response.data[0].search.results.map(item => item.content);
          commit("setCompanies", companies);
        } else {
          commit("setCompanies", []);
        }
      }
    } catch (error) {
      console.error("failed to fetch companies:", error);
    }
  },

  async fetchClaimedCompanies({ rootState, commit }) {
    try {
      const companies = await this.$directus.items("companies");
      const account_companies = await this.$directus.items("accounts_companies");
      const { account } = { ...rootState.user };
      const arr = [];
      for (let i = 0; i < account.company_id.length; i++) {
        let accounts_company = await account_companies.read(account.company_id[i]);
        if (accounts_company.data) {
          let company = await companies.read(accounts_company.data.company_id);
          if (company.data) {
            arr.push(company.data);
          }
        }
      }
      commit("setClaimedCompanies", arr);
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSelectedCompany({ commit }, id) {
    try {
      const response = await this.$axios.get(`/custom/search/company/${id}`);

      // const companies = await this.$directus.items("companies");
      // const response = await companies.read(id);

      if (response.data[0].search.results) {
        commit("setSelectedCompany", response.data[0].search.results[0]);
      }
    } catch (error) {
      console.error(`failed to fetch company ${id}: ${error}`);
    }
  },

  async claimCompany({ dispatch, rootState }, id) {
    try {
      const accounts = await this.$directus.items("accounts");
      const accounts_companies = await this.$directus.items("accounts_companies");
      if (!rootState.user.account.account_id) {
        await dispatch("user/fetchAccount", null, { root: true });
      }

      const { account_id, company_id } = { ...rootState.user.account };
      const { data } = await accounts_companies.create({ account_id: account_id, company_id: id });
      const company_claims = company_id.concat(data.id);
      const response = await accounts.update(account_id, { company_id: company_claims });

      if (response.data) {
        await dispatch("user/fetchAccount", account_id, { root: true });
      }
    } catch (error) {
      console.error(`failed to claim company: ${error}`);
    }
  },
}