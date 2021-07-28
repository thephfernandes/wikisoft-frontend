export const state = () => ({
  authenticated: false,
  authType: '',
  oAuthCode: '',
  accessToken: '',
  corsState: '',
});

export const getters = {
  getAuthenticated: (state) => {
    return state.authenticated;
  },

  getAuthType: (state) => {
    return state.authType;
  },

  getOAuthCode: (state) => {
    return state.oAuthCode;
  },

  getAccessToken: (state) => {
    return state.accessToken;
  },

  getCorsState: (state) => {
    return state.corsState;
  }
};

export const mutations = {
  setAuthenticated(state, payload) {
    state.authenticated = payload;
  },

  setAuthType(state, payload) {
    state.authType = payload;
  },

  setOAuthCode(state, payload) {
    state.oAuthCode = payload;
  },

  setAccessToken(state, payload) {
    state.accessToken = payload;
  },

  setCorsState(state, payload) {
    state.corsState = payload;
  }
};

export const actions = {

}