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
    creatingNewPaciente: false,
  },
  mutations: {
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
