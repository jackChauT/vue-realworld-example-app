import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueNativeSock from "vue-native-websocket";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:4442',
//   vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//   },
//   options: { path: "/website/" } //Optional options
// }))
Vue.use(VueNativeSock, "ws://192.168.66.106:4442", {
  store: store,
  format: "json",
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000
});

ApiService.init();

// Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) =>
//   // console.log("Checking auth")
//   Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
// );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
