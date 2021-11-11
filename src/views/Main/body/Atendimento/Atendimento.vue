<template>
  <div>
    <v-form v-model="valid">
      <div class="head my-3">
        <v-row>
          <v-col cols="3">
            <v-label> Nome: </v-label>
            <span>{{ paciente.nome }}</span>
          </v-col>

          <v-col cols="6" class="align-center d-flex">
            <v-label> Plano Alimentar:*</v-label>
            <v-autocomplete
              no-data-text="Sem dados disponiveis"
              v-model="atendimento.planoAlimentar.id"
              :items="planoAlimentares"
              :rules="rules.plano"
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
          <v-col cols="3">
            <v-btn
              color="success"
              dark
              class="mb-2 mr-5"
              @click="save()"
              :disabled="!valid"
              width="100%"
              height="100%"
            >
              Salvar
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-label> GEB: </v-label>
            <span>{{ GEB ? GEB.toFixed(2) : "" }}</span>
          </v-col>
          <v-col cols="6" class="d-flex align-center">
            <v-label> Objetivos: </v-label>
            <v-autocomplete
              no-data-text="Sem dados disponiveis"
              v-model="paciente.objetivos"
              :items="objetivos"
              multiple
              item-text="nome"
              hide-details
              class="mx-8"
              dense
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

          <v-col cols="3" @click="creating.anamneses = true">
            <v-btn
              depressed
              width="100%"
              color="primary"
              v-if="!creating.anamneses"
            >
              <v-icon>mdi-plus</v-icon>
              Anamneses
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="9">
            <v-label> GET: </v-label>
            <span>{{ GET ? GET.toFixed(2) : "" }}</span>
          </v-col>
          <v-col cols="3" v-if="!creating.antropometrico">
            <v-btn
              depressed
              color="primary"
              width="100%"
              @click="creating.antropometrico = true"
            >
              <v-icon>mdi-plus</v-icon>
              Antropométrico
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <div class="head my-3" v-if="creating.anamneses">
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h4 class="title-caption">Anamneses</h4></div>
          <div class="d-flex">
            <v-btn icon :disabled="loading" @click="creating.anamneses = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-title>
      <v-card-text>
        <Anamneses v-model="atendimento.anamneses" />
      </v-card-text>
    </div>
    <div class="head my-3" v-if="creating.antropometrico">
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h4 class="title-caption">Antropométrico</h4></div>
          <div class="d-flex">
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
        <Antropometrico :id="id" v-model="atendimento.antropometrico" />
      </v-card-text>
    </div>
    <router-view />
    <v-snackbar
      v-model="notification.open"
      :color="notification.color"
      vertical
      right
      :timeout="2500"
      top
    >
      <h2>{{ notification.title }}</h2>
      <hr class="mt-2 mb-2" />
      <span>{{ notification.message }}</span>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import AtendimentoService from "@/services/AtendimentoService";
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
  objetivos: Objective.Objective[] = [];
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
  valid = false;
  atendimento: Atendimento.Atendimento = {
    paciente: {
      id: "",
    },
    planoAlimentar: {
      id: "",
    },
    antropometrico: {
      data: "",
      idade: 0,
      descricao: "",
      altura: 0,
      peso: 0,
      ombroCircunferencia: 0,
      peitoralCircunferencia: 0,
      cinturaCircunferencia: 0,
      abdomenCircunferencia: 0,
      quadrilCircunferencia: 0,
      panturrilhaDireitaCircunferencia: 0,
      panturrilhaEsquerdaCircunferencia: 0,
      pescocoCircunferencia: 0,
      punhoCircunferencia: 0,
      coxaDireitaCircunferencia: 0,
      coxaEsquerdaCircunferencia: 0,
      bracoDireitoCircunferencia: 0,
      bracoEsquerdoCircunferencia: 0,
      antebraco: 0,
      massaGorda: 0,
      massaMagra: 0,
      pesoResidual: 0,
      pesoOsseo: 0,
      pesoMuscula: 0,
    },
    anamneses: {
      alergias: [],
      patologias: [],
      data: "",
      alcool: "",
      tabagismo: "",
      sono: 0,
      praticaExercicios: "",
      medicamentos: "",
      apetite: "",
      mastigacao: "",
      consumoDagua: 0,
      habitoUrinario: "",
      habitoIntestinal: "",
      observacoes: "",
    },
  };
  notification = {
    open: false,
    color: "error",
    title: "Usuário criado com sucesso",
    message: "",
  };
  loading = false;
  planoAlimentares: PlanoAlimentar.PlanoAlimentar[] = [];

  get rules() {
    return {
      plano: [(v: string) => !!v || "Campo obrigatório"],
    };
  }

  async mounted() {
    this.paciente = await PacienteService.findById(this.id);
    this.findDataList();
  }

  async findDataList() {
    this.objetivos = await ObjectiveService.findAll();
    this.planoAlimentares = await PlanoAlimentarService.findAll();
    AtendimentoService.findLastAtendimento(this.id).then((e) => {
      this.atendimento = {
        paciente: e.paciente,
        planoAlimentar: e.planoAlimentar,
        anamneses: e.anamneses ? e.anamneses : this.atendimento.anamneses,
        antropometrico: e.antropometrico
          ? e.antropometrico
          : this.atendimento.antropometrico,
      };
      this.atendimento.anamneses!.id = undefined;
      this.atendimento.antropometrico!.id = undefined;
    });
  }

  createData(name: string) {
    this.$router.push({ name });
  }

  save() {
    this.atendimento.paciente.id = this.paciente.id;
    AtendimentoService.save(this.atendimento).then(
      () => {
        this.notification = {
          open: true,
          color: "success",
          title: "Atendimento finalizado",
          message: "Atendimento finalizado com sucesso",
        };
        this.$emit("alterComponent");
      },
      () => {
        this.notification = {
          open: true,
          color: "error",
          title: "Erro",
          message: "Erro ao realizar atendimento",
        };
      }
    );
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
