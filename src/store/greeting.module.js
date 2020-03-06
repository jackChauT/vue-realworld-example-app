const state = {
  currentPerson: null,
  peopleAtHome: []
};

const getters = {
  currentPerson(state) {
    return state.currentPerson;
  },
  peopleAtHome(state) {
    return state.peopleAtHome;
  }
};

const mutations = {
  updateCurrentPerson(state, payload) {
    state.currentPerson = payload;
  },
  updatePeopleAtHome(state, payload) {
    state.peopleAtHome = payload;
  }
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters
};
