import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req }) => {
  createPersistedState({
    paths: ['user', 'companies', 'people', 'oAuth'],
    // storage: {
    //   // getItem: (key) => {
    //   //   if (process.server) {
    //   //     let cookieHeader = req.headers.cookie;
    //   //     if (typeof cookieHeader !== 'string') {
    //   //       cookieHeader = '';
    //   //     }
    //   //     const parsedCookies = cookie.parse(cookieHeader);
    //   //     return parsedCookies[key];
    //   //   } else {
    //   //     return Cookies.get(key);
    //   //   }
    //   // },
    //   getItem: (key) => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie||'')[key],
    //   setItem: (key, value) => Cookies.set(key, value, { secure: false }),
    //   removeItem: key => Cookies.remove(key)
    // }
  })(store);
};