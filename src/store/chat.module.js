const state = {
  messages: "Waiting for Command...",
  style: { fontSize: "36px", textAlign: "center" }
};

const getters = {
  messages(state) {
    return state.messages;
  },
  style(state) {
    return state.style;
  }
};

const mutations = {
  updateMessages(state, payload) {
    console.log(payload);
    state.messages = payload;
  },
  updateStyle(state, payload) {
    state.style = payload;
  }
};
const actions = {};

export default {
  state,
  actions,
  mutations,
  getters
};
