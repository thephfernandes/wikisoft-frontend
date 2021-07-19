import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

export default ({ app, store, req }) => {
  createPersistedState({
    paths: ['user', 'companies', 'people'],
    storage: {
      getItem: (key) => {
        if (process.server) {
          let cookieHeader = req.headers.cookie;
          if (typeof cookieHeader !== 'string') {
            cookieHeader = '';
          }
          const parsedCookies = app.$cookies.nodeCookie.parse(cookieHeader);
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, value, { secure: false }),

      removeItem: key => Cookies.remove(key)
    }
  })(store);
};