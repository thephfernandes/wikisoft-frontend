export const state = () => ({
  user: {},
  account: {},
  contact: {},
  background: {},
});

export const getters = {
  getUser: (state) => {
    return state.user;
  },

  getAccount: (state) => {
    return state.account;
  },

  getContactDetails: (state) => {
    return state.contact;
  },

  getBackground: (state) => {
    return state.background;
  },
};

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setAccount(state, payload) {
    state.account = payload;
  },

  setContactDetails(state, payload) {
    state.contact = payload;
  },

  setBackground(state, payload) {
    state.background = payload;
  },
};

export const actions = {
  async createUser({ commit }, payload) {
    try {
      const users = await this.$directus.users;
      const response = await users.create(payload);
      if (response.data) {
        const user = response.data;
        commit("setUser", user);
      }
    } catch (error) {
      console.error("failed to create user:", error);
    }
  },

  async fetchUser({ commit }, id) {
    try {
      let me;
      if (id) {
        me = await this.$directus.users.read(id).data;
      } else {
        me = this.$auth.user;
      }
      delete me.password;
      delete me.tfa_secret;
      commit('setUser', me);
    } catch (error) {
      console.error(`failed to fetch ${id}`, error);
    }
  },

  async updateUser({ dispatch, state }, payload) {
    try {
      const { id } = { ...state.user };
      if (payload) {
        console.log("updating user with payload:", payload)
        await this.$directus.users.me.update(payload);
      } else {
        const { user } = { ...state };
        await this.$directus.users.update(id, user);
      }
      await dispatch('fetchUser', id);
    } catch (error) {
      console.error("failed to update:", error);
    }
  },

  async deleteUser({ commit }, id) {
    try {
      await this.$directus.users.delete(id);
      commit("setUser", {});
    } catch (error) {
      console.error(`failed to delete ${id}:`, error)
    }
  },

  async createEmployer({ dispatch }, payload) {
    try {
      await dispatch("updateUser", { ...payload, is_employer: true });
    } catch (error) {
      console.error("failed to create employer:", error);
    }
  },

  async createAccount({ commit, dispatch }, payload) {
    try {
      const accounts = await this.$directus.items("accounts");
      const response = await accounts.create(payload);
      if (response.data) {
        const account = response.data;
        commit("setAccount", account);
        await dispatch("updateUser", { account_id: account.account_id });
      }
    } catch (error) {
      console.error("failed to create account:", error);
    }
  },

  async fetchAccount({ commit }, id) {
    try {
      const accounts = await this.$directus.items("accounts");
      let response = {};

      if (id) {
        response = await accounts.read(id);
      } else {
        const me = this.$auth.user;
        response = await accounts.read(me.account_id);
      }

      if (response.data) {
        const account = response.data;
        commit("setAccount", account);
      }
    } catch (error) {
      console.error(`failed to get account: ${error}`);
    }
  },

  async updateAccount({ dispatch, state }, payload) {
    try {
      const accounts = await this.$directus.items("accounts");
      const { account_id } = { ...state.account };
      // let response = {};

      // if (payload) {
      //   response = await accounts.update(account_id, payload);
      // } else {
      //   const { account } = { ...state };
      //   response = await accounts.update(account_id, account);
      // }

      // if (response.data) {
      //   const account = response.data;
      //   commit("setAccount", account);
      // }

      if (payload) {
        await accounts.update(account_id, payload);
      } else {
        const { account } = { ...state };
        await accounts.update(account_id, account);
      }

      await dispatch("fetchAccount", account_id);
    } catch (error) {
      console.error(`failed to update account ${state.account.account_id}: ${error}`)
    }
  },

  async claimProfile({ dispatch, state }, id) {
    try {
      const accounts = await this.$directus.items("accounts");
      const accounts_people = await this.$directus.items("accounts_people");
      if (!state.account.account_id) {
        await dispatch("user/fetchAccount");
      }

      const { account_id, person_id } = { ...state.account };
      const { data } = await accounts_people.create({ account_id: account_id, person_id: id });
      const people_claims = person_id.concat(data.id);
      const response = await accounts.update(account_id, { person_id: people_claims });

      if (response.data) {
        await dispatch("user/fetchAccount", account_id, { root: true });
      }
    } catch (error) {
      console.error(`failed to claim person: ${error}`);
    }
  },

  async fetchContactDetails({ commit }) {
    commit('setContactDetails');
  },

  async fetchBackground({ commit }) {
    commit('setBackground');
  },


}
