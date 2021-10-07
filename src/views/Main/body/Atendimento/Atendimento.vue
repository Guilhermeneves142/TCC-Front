<template>
  <div>
    <div class="head my-3">
      <v-row>
        <v-col cols="4">
          <v-label> Nome: </v-label>
          <span>{{ paciente.nome }}</span>
        </v-col>

        <v-col cols="5" class="align-center d-flex">
          <v-label> Plano Alimentar: </v-label>
          <v-autocomplete
            no-data-text="Sem dados disponiveis"
            v-model="paciente.planoAlimentar"
            :items="planoAlimentares"
            item-text="nome"
            class="mx-8"
            hide-details
            dense
            item-value="id"
          />
          <v-btn
            icon
            color="primary"
            @click="createData('NewPlanoAlimentarAtendimento')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-label> GEB: </v-label>
          <span>{{ GEB.toFixed(2) }}</span>
        </v-col>
        <v-col cols="5" class="d-flex align-center">
          <v-label> Objetivos: </v-label>
          <v-autocomplete
            no-data-text="Sem dados disponiveis"
            v-model="paciente.objetivos"
            :items="objetivos"
            item-text="nome"
            hide-details
            class="mx-8"
            dense
            multiple
            item-value="id"
          />
          <v-btn
            icon
            color="primary"
            @click="createData('NewObjetivoAtendimento')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="3">
          <v-btn
            depressed
            color="primary"
            @click="creating.anamneses = true"
            v-if="!creating.anamneses"
          >
            <v-icon>mdi-plus</v-icon>
            Anamneses
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-label> GET: </v-label>
          <span>{{ GET.toFixed(2) }}</span>
        </v-col>
        <v-col cols="3">
          <v-btn
            depressed
            color="primary"
            @click="creating.antropometrico = true"
            v-if="!creating.antropometrico"
          >
            <v-icon>mdi-plus</v-icon>
            Antropométrico
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="head my-3" v-if="creating.anamneses">
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h4 class="title-caption">Anamneses</h4></div>
          <div class="d-flex">
            <v-btn
              color="success"
              dark
              class="mb-2 mr-5"
              @click="saveAnamneses()"
              height="100%"
            >
              Salvar
            </v-btn>
            <v-btn icon :disabled="loading" @click="creating.anamneses = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-title>
      <v-card-text>
        <Anamneses />
      </v-card-text>
    </div>
    <div class="head my-3" v-if="creating.antropometrico">
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h4 class="title-caption">Antropométrico</h4></div>
          <div class="d-flex">
            <v-btn
              color="success"
              dark
              class="mb-2 mr-5"
              @click="saveAntropometrico()"
              height="100%"
            >
              Salvar
            </v-btn>
            <v-btn
              icon
              :disabled="loading"
              @click="creating.antropometrico = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-title>
      <v-card-text>
        <Antropometrico :id="id" />
      </v-card-text>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import ObjectiveService from "@/services/ObjectiveService";
import PacienteService from "@/services/PacienteService";
import PlanoAlimentarService from "@/services/PlanoAlimentarService";
import Anamneses from "./Anamneses.vue";
import Antropometrico from "./Antropometrico.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import calcs from "@/utils/calcs";
import moment from "moment";

@Component({
  components: {
    Anamneses,
    Antropometrico,
  },
})
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
  creating = {
    anamneses: false,
    antropometrico: false,
  };
  loading = false;
  objetivos: Objective.Objective[] = [];
  planoAlimentares: PlanoAlimentar.PlanoAlimentar[] = [];

  async mounted() {
    this.paciente = await PacienteService.findById(this.id);
    this.findDataList();
  }

  async findDataList() {
    this.objetivos = await ObjectiveService.findAll();
    this.planoAlimentares = await PlanoAlimentarService.findAll();
  }

  createData(name: string) {
    this.$router.push({ name });
  }

  saveAnamneses() {
    this.creating.anamneses = false;
  }

  saveAntropometrico() {
    this.creating.antropometrico = false;
  }

  @Watch("$route")
  handleRouterChanged() {
    this.findDataList();
  }

  get GEB() {
    return calcs.GEB(this.paciente.genero, this.idade, this.peso, this.altura);
  }

  get GET() {
    return calcs.GET(
      this.paciente.genero,
      this.idade,
      this.peso,
      this.altura,
      this.praticaExercicios
    );
  }

  get peso() {
    return this.$store.state.peso;
  }

  get altura() {
    return this.$store.state.altura;
  }

  get praticaExercicios() {
    return this.$store.state.praticaExercicios;
  }

  get idade() {
    return Number(
      moment(this.paciente.dataNascimento)
        .locale("pt-br")
        .fromNow()
        .replace(/\D/g, "")
    );
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
