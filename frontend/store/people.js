import featuredPeopleData from "~/assets/data/featured-people.json";

export const state = () => ({
  people: [],
  claimedPeople: [],
  selectedPerson: {},
  me: {},
  fields: {},
  featuredPeople: featuredPeopleData,
  isFeatured: false,
});

export const getters = {
  getPeople: (state) => {
    return state.people;
  },

  getClaimedPeople: (state) => {
    return state.claimedPeople;
  },

  getPerson: (state) => (id) => {
    return state.people.find((c) => c.id === id);
  },

  getSelectedPerson: (state) => {
    return state.selectedPerson;
  },

  getMe: (state) => {
    return state.me;
  },

  getFields: (state) => {
    return state.me;
  },

  getFeaturedPeople: (state) => {
    return state.featuredPeople;
  },

  getIsFeatured: (state) => {
    return state.isFeatured;
  },
};

export const mutations = {
  setPeople(state, payload) {
    state.people = payload;
  },

  setClaimedPeople(state, payload) {
    state.claimedPeople = payload;
  },

  setSelectedPerson(state, payload) {
    state.selectedPerson = payload;
  },

  setMe(state, payload) {
    state.me = payload;
  },

  setFields(state, payload) {
    state.fields = payload;
  },

  setIsFeatured(state, payload) {
    state.isFeatured = payload;
  }
};

export const actions = {
  async fetchPeople({ commit, rootState }, query) {
    try {
      let response = {};
      if (query) {
        const { search, filter } = query
        response = await this.$axios.get(`/custom/search/people/${search}/`);
      } else {
        response = await this.$axios.get(`/custom/search/people/${rootState.search.query}`);
      }

      // const people = await this.$directus.items("people");
      // let response = {};
      // if (query) {
      //   response = await people.read(query)
      // } else {
      //   response = await people.read({
      //     search: rootState.search.query
      //   })
      // }

      if (response.data) {
        if (response.data[0]?.search.results?.length > 0) {
          commit("setPeople", response.data[0].search.results);
        } else {
          commit("setPeople", []);
        }
      }
    } catch (error) {
      console.error("failed to fetch people:", error);
    }
  },

  async fetchClaimedPeople({ rootState, commit }) {
    try {
      const people = await this.$directus.items("people");
      const account_people = await this.$directus.items("accounts_people");
      const { account } = { ...rootState.user };
      const arr = [];
      for (let i = 0; i < account.person_id.length; i++) {
        let account_person = await account_people.read(account.person_id[i]);
        if (account_person.data) {
          let person = await people.read(account_person.data.person_id);
          if (person.data) {
            arr.push(person.data);
          }
        }
      }
      commit("setClaimedPeople", arr);
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSelectedPerson({ commit }, id) {
    try {
      const response = await this.$axios.get(`/custom/search/people/${id}`);

      // const people = await this.$directus.items("people");
      // const response = await people.read(id);

      if (response.data[0].search.results) {
        await commit('setSelectedPerson', response.data[0].search.results[0]);
      }
    } catch (error) {
      console.error(`failed to fetch person ${id}:`, error);
    }
  },

  async fetchMe({ commit }, id) {
    try {
      // if (this.$auth && this.$auth.user && this.$auth.user.person_profiles && this.$auth.person_profiles.length > 0) {
      //   const people = await this.$directus.items("people");
      //   const response = await people.read(this.$user.person_profiles[0]);
      //   await commit("setMePeople", response)
      //   return response
      // }

      const people = await this.$directus.items("people");
      const response = await people.read(id);
      await commit("setMe", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  async updateMe({ dispatch, state }, fields) {
    try {
      // if (this.$auth.user && this.$auth.user.id !== "") {
      //   const resposne = await this.$auth.user.me.read()
      //   if (response && response.id) {
      //     Promise.revolse(dispatch("updatePerson", resposne.id, Person))
      //   }
      // }
      const { person_id } = { ...state.me };
      if (fields) {
        await this.$directus.items("people").update(person_id, fields);
      } else {
        await this.$directus.items("people").update(person_id, { ...state.fields });
      }
      await dispatch("fetchMe", person_id);
    } catch (error) {
      console.error("failed to update:", error);
    }
  },

  async deleteMe({ commit, state }) {
    try {
      const { person_id } = { ...state.me };
      await this.$directus.items("people").delete(person_id);
      commit("setMe", {});
    } catch (error) {
      console.error(`failed to delete ${person_id}:`, error);
    }
  },

  async updatePerson({ dispatch }, id, Person) {
    const people = await this.$directus.items("people")
    try {
      const response = await people.update(id, Person)
      if (response.status === 200) {
        let newPerson = state.people
        Object.keys(response.data).forEach(key => {
          newPerson[key] = response.data[key]
        });
        await dispatch('setPerson', newPerson)
      }
    } catch (error) {
      return error
    }
  },

  async requestPasswordReset({ dispatch }, email) {
    try {
      const response = await this.$auth.password.request(email)
      return response;
    } catch (error) {
      return error
    }
  },

  async updatePassword({ dispatch }, pwd, token) {
    try {
      const response = await this.$auth.password.reset(token, pwd)
      return response
    } catch (error) {
      return error
    }
  },

  async updateStatus({ state }, value) {
    try {
      const { person_id } = { ...state.me };
      await this.$directus.items("people").update(person_id, { status: value });
      await dispatch("fetchMe", person_id);
    } catch (error) {
      console.error("failed to update:", error);
    }
  }
}