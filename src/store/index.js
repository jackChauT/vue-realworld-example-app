import Vue from "vue";
import Vuex from "vuex";

// import home from "./home.module";
// import auth from "./auth.module";
// import article from "./article.module";
// import profile from "./profile.module";

Vue.use(Vuex);

// export default new Vuex.Store({
//   modules: {
//     home,
//     auth,
//     article,
//     profile
//   }
// });

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false
    }
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      console.log(event);
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    }
  },
  actions: {
    sendMessage: function(context, message) {
      Vue.prototype.$socket.send(message);
    }
  }
});
