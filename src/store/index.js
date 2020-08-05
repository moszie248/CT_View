import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let api_uri = "http://localhost:1001/api/v1/crud/";

export default new Vuex.Store({
  state: {
    forms: [],
    data: []
  },
  mutations: {
    fetchForm(state, { res }) {
      state.forms = res.data;
    },
    addForm(state, { payload }) {
      state.forms.push(payload);
    },
    deleteForm(state, { payload }) {
      state.forms.splice(payload, 1);
    },
    editForm(state, { payload }) {
      state.forms[payload.index] = {
        name: payload.name,
        age: payload.age,
        aka: payload.aka
      };
    }
  },
  actions: {
    async fetchForm({ commit }) {
      await axios
        .get(api_uri)
        .then(res => commit("fetchForm", { res }))
        .catch(err => alert(err));
    },
    async addForm({ commit }, payload) {
      await axios
        .post(api_uri, payload)
        .then(() => commit("addForm", { payload }))
        .catch(err => alert(err));
      this.fetchForm();
    },
    async deleteForm({ commit }, payload) {
      await axios
        .delete(api_uri + payload._id, payload)
        .then(() => commit("deleteForm", { payload }))
        .catch(err => alert(err));
    },
    async editForm({ commit }, payload) {
      this.data = {
        name: payload.name,
        age: payload.age,
        aka: payload.aka
      };
      await axios
        .put(api_uri + payload._id, this.data)
        .then(() => commit("editForm", { payload }))
        .catch(err => alert(err));
      // commit("editForm", { payload });
    }
  },
  modules: {},
  getters: {
    forms: state => state.forms
  }
});
