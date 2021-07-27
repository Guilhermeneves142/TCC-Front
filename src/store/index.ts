import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    nome: "",
    idNutricionista: 0,
  },
  mutations: {
    LOGIN(state, data) {
      localStorage.setItem("token", data);
      state.token = data;
    },
    CLARIFY(state, data) {
      state.nome = data.nome;
      state.idNutricionista = data.id;
    },
  },
  actions: {},
  modules: {},
});
