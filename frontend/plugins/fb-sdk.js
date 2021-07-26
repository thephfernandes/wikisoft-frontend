import Vue from "vue";

const vue_fb = {};

vue_fb.install = function install(Vue) {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function onSDKInit() {
    FB.init({
      appId: process.env.OAUTH_FACEBOOK_APP_ID,
      autoLogAppEvents: true,
      cookie: true,
      xfbml: true,
      version: 'v11.0'
    });
    Vue.FB = FB;
    window.dispatchEvent(new Event('fb-sdk-ready'));
    vue_fb.sdk = FB;

    FB.getLoginStatus(function (response) {
      console.log(response);

      // if (response.status === "connected") {
      //   store.commit("user/setUser", response.authResponse);
      //   store.commit("user/setAuthType", "facebook");
      // }
    });
  };
  Vue.FB = undefined;
}

Vue.use(vue_fb);
export default ({ app }, inject) => {
  inject('fb', vue_fb)
}

// export default ({ store }) => {
//   window.fbAsyncInit = function () {
//     FB.init({
//       appId: process.env.OAUTH_FACEBOOK_APP_ID,
//       cookie: true,
//       xfbml: true,
//       version: 'v11.0'
//     });

//     FB.AppEvents.logPageView();

//     FB.getLoginStatus(function (response) {
//       if (response.status === "connected") {
//         store.commit("user/setUser", response.authResponse);
//         store.commit("user/setAuthType", "facebook");
//       }
//     });
//   };
// }