export const state = () => ({
    query: "",
    queryTypes: [],
    focused: false,
});

export const getters = {
    getQuery: (state) => {
        return state.query;
    },

    getQueryTypes: (state) => {
        return state.queryTypes;
    }
};

export const mutations = {
    setQuery(state, payload) {
        state.query = payload;
    },

    setQueryTypes(state, payload) {
        state.queryTypes = payload;
    },

    addQueryType(state, payload) {
        state.queryTypes.push(payload);
    },

    removeQueryType(state, payload) {
        state.queryTypes.splice(state.queryTypes.indexOf(payload), 1);
    },
    setFocus(state, bool) {
        state.focused = bool
    }
};

