import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    nome: "",
    idNutricionista: "",
    idConsultorio: "",
  },
  mutations: {
    LOGIN(state, data) {
      localStorage.setItem("token", data);
      state.token = data;
    },
    LOGOUT(state) {
      localStorage.clear();
      state = {
        token: localStorage.getItem("token"),
        nome: "",
        idNutricionista: "",
        idConsultorio: "",
      };
    },
    CLARIFY(state, data) {
      state.nome = data.nome;
      state.idNutricionista = data.idNutricionista;
      state.idConsultorio = data.consultorio.id ?? "";
    },
  },
  actions: {},
  modules: {},
});
