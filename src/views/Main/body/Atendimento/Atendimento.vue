<template>
  <div>
    <div class="head">
      <v-row>
        <v-col cols="4">
          <v-label> Nome: </v-label>
          <span>{{ paciente.nome }}</span>
        </v-col>

        <v-col cols="5" class="d-flex">
          <v-label> Plano Alimentar: </v-label>
          <v-select
            no-data-text="Sem dados disponiveis"
            v-model="paciente.planoAlimentar"
            item-text="nome"
            class="mx-8"
            hide-details
            dense
            item-value="id"
          />
        </v-col>
        <v-col>
          <a>{{ dataAtual }}</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-label> GEB: </v-label>
        </v-col>
        <v-col cols="5" class="d-flex">
          <v-label> Objetivos: </v-label>
          <v-select
            no-data-text="Sem dados disponiveis"
            v-model="paciente.planoAlimentar"
            item-text="nome"
            hide-details
            class="mx-8"
            dense
            item-value="id"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-label> GET: </v-label>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import PacienteService from "@/services/PacienteService";
import moment from "moment";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Atendimento extends Vue {
  @Prop() id!: string;
  paciente: Paciente.Paciente = {
    doencas: [],
    consultorio: {
      id: "",
    },
    objetivos: [],
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    dataNascimento: "",
    genero: "",
    id: "",
  };

  async mounted() {
    this.paciente = await PacienteService.findById(this.id);
  }

  get dataAtual() {
    return moment().format("DD/MM/YYYY HH:mm");
  }
}
</script>

<style scoped>
.head {
  border: 1px solid rgb(170, 170, 170);
  padding: 1em;
  border-radius: 0.5em;
  background-color: rgb(231, 231, 231);
  color: black;
}
</style>
