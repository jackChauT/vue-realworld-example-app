import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/main.css";

// import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueNativeSock from "vue-native-websocket";
import VueI18n from "vue-i18n";
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueI18n);
const server = "192.168.66.140";

Vue.use(VueNativeSock, `ws://${server}:4442`, {
  store: store,
  format: "json",
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 10, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 5000
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDem1PH-zkgL3csbp-BTYI8qi8wBQjMN4E',
    libraries: 'places,drawing,visualization,geometry',
  },
  installComponents: true
});

ApiService.init();
let homeiUrl = `http://${server}:3000`;
var messages = {"en":{}, "ct":{},"cn":{}};
axios
  .get(`${homeiUrl}/website/locates`)
  .then(function(response) {
    if (response.status == 200) {
      console.log(response.data);
      messages = response.data.data; 
      i18n.setLocaleMessage("en", messages.en);
      i18n.setLocaleMessage("ct", messages.ct);
      i18n.setLocaleMessage("cn", messages.ct);
    }
  })
  
const i18n = new VueI18n({
  locale: "ct", // set locale,
  fallbackLocale: "ct",
  messages: messages["data"]
});

// Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) =>
//   // console.log("Checking auth")
//   Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
// );
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");