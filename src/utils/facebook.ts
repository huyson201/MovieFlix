declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export function initFacebookSdk() {
  // if (window.FB && window.FB.XFBML) {
  //   window.FB.XFBML.parse();
  // }

  window.fbAsyncInit = function () {
    window.FB.init({
      appId: import.meta.env.VITE_FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v17.0",
    });
  };

  (function (d, s, id) {
    var js: any,
      fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/en_US/sdk.js`;
    js.nonce = "1HNZwD4m";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}
