export default ({ store }) => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: process.env.FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v11.0'
    });

    FB.AppEvents.logPageView();

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        store.commit("user/setUser", response.authResponse);
        store.commit("user/setAuthType", "facebook");
      }
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}