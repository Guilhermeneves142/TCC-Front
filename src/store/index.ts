import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    nome: "",
    idNutricionista: "",
    idConsultorio: "",
    idPaciente: "",
    peso: 0,
    altura: 0,
    praticaExercicios: "",
    creatingNewPaciente: false,
  },
  mutations: {
    PESO(state, data) {
      state.peso = data;
    },
    ALTURA(state, data) {
      state.altura = data;
    },
    EXERCICIOS(state, data) {
      state.praticaExercicios = data;
    },
    LOGIN(state, data) {
      localStorage.setItem("token", data);
      state.token = data;
    },
    CONSULT(state, data) {
      state.idPaciente = data.id;
    },
    CREATING_NEW_PACIENTE(state, data) {
      state.creatingNewPaciente = data;
    },
    LOGOUT(state) {
      localStorage.clear();
      const valueDefault = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = {
        token: valueDefault,
        nome: valueDefault,
        idNutricionista: valueDefault,
        idConsultorio: valueDefault,
        idPaciente: valueDefault,
        creatingNewPaciente: false,
        altura: 0,
        peso: 0,
        praticaExercicios: "",
      };
    },
    CLARIFY(state, data) {
      state.nome = data.nome;
      state.idNutricionista = data.idNutricionista;
      state.idConsultorio = data.consultorio?.id ?? "";
    },
  },
  actions: {},
  modules: {},
});
