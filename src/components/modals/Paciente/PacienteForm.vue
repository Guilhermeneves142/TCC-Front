<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Paciente</span>
          <v-spacer />
          <v-btn icon :disabled="loading" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Nome *"
                    v-model="paciente.nome"
                    color="primary"
                    :rules="rules.nome"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Email "
                    v-model="paciente.email"
                    color="primary"
                    :rules="rules.email"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    label="Objetivos"
                    no-data-text="Sem dados disponiveis"
                    v-model="paciente.objetivos"
                    :items="objetivos"
                    item-text="nome"
                    clearable
                    item-value="id"
                    multiple
                    return-object
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-menu
                    v-model="data"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="formatDateToString(paciente.dataNascimento)"
                        label="Data de nascimento *"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="paciente.dataNascimento"
                      locale="pt-br"
                      :title-date-format="formatDateToString"
                      @change="data = false"
                      year-icon="mdi-calendar-blank"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Telefone"
                    v-model="paciente.telefone"
                    prefix="(55)"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Celular *"
                    v-model="paciente.celular"
                    prefix="(55)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-radio-group
                    v-model="paciente.genero"
                    label="Genero *"
                    mandatory
                  >
                    <v-radio label="Masculino" value="masculino" />
                    <v-radio label="Feminino" value="Feminino" />
                  </v-radio-group>
                </v-col>
                <v-col cols="5">
                  <v-select
                    label="Responsavel"
                    no-data-text="Sem dados disponiveis"
                    v-model="paciente.responsavel"
                    :items="responsaveis"
                    item-text="nome"
                    clearable
                    item-value="id"
                    return-object
                  />
                </v-col>
                <v-col>
                  <v-btn
                    elevation="0"
                    :color="createResponsavel ? 'primary' : 'success'"
                    class="mt-3"
                    @click="createResponsavel = Number(!createResponsavel)"
                  >
                    <v-icon v-if="!createResponsavel">mdi-content-save</v-icon>
                    {{
                      createResponsavel
                        ? "Cadastrar Responsavel"
                        : "Salvar Responsavel"
                    }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <responsavel-form
                  v-model="createResponsavel"
                  @responsavel="responsavel = $event"
                />
              </v-row>
            </v-container>
          </v-form>
          <small>*Campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="close"
            outlined
            text
            :disabled="loading"
          >
            Voltar
          </v-btn>
          <v-btn color="primary" @click="save" :disabled="loading || !valid">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ResponsavelForm from "./ResponsavelForm.vue";
import ObjectiveService from "@/services/ObjectiveService";
import ResponsavelService from "@/services/ResponsavelService";
import Moment from "moment";
import PacienteService from "@/services/PacienteService";

@Component({
  components: {
    ResponsavelForm,
  },
})
export default class PacienteForm extends Vue {
  @Prop() id!: string;
  dialog = true;
  loading = false;
  data = false;
  valid = false;
  createResponsavel = 1;
  notification = {
    open: false,
    color: "error",
    title: "Usuário criado com sucesso",
    message: "",
  };
  paciente: Paciente.Paciente = {
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
  };
  responsavel: Responsavel.Responsavel = {
    consultorio: { id: "" },
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    celular: "",
    endereco: "",
  };
  responsaveis: Responsavel.Responsavel[] = [];
  objetivos: Objective.Objective[] = [];

  get pacienteForSave() {
    const paciente = this.paciente;
    paciente.consultorio.id = this.consultorio;
    paciente.dataNascimento = String(paciente.dataNascimento).substring(0, 10);
    return paciente;
  }

  get responsavelForSave() {
    const responsavel = this.responsavel;
    responsavel.consultorio.id = this.consultorio;
    return responsavel;
  }

  get consultorio() {
    return this.$store.state.idConsultorio;
  }

  get rules() {
    return {
      nome: [(v: string) => !!v || "Nome é obrigatório"],
    };
  }

  async created() {
    this.paciente.dataNascimento =
      Moment.utc(969159600000).format("YYYY-MM-DD");
  }

  async mounted() {
    this.objetivos = await ObjectiveService.findAll();
    this.responsaveis = await ResponsavelService.findAll();
    if (this.id) {
      this.paciente = await PacienteService.findById(this.id);
    }
  }

  formatDateToString(data: string) {
    return Moment(data).locale("pt-br").format("DD MMM YYYY");
  }

  close() {
    this.dialog = false;
    this.$router.back();
  }

  save() {
    PacienteService.save(
      this.pacienteForSave,
      this.responsavelForSave.nome ? this.responsavelForSave : undefined
    ).then(
      () => {
        this.notification = {
          open: true,
          color: "success",
          title: "Cadastro realizado",
          message: "O Paciente foi cadastrado com sucesso",
        };
        setTimeout(() => {
          this.close();
        }, 1000);
      },
      () => {
        this.notification = {
          open: true,
          color: "error",
          title: "Erro ao realizar cadastro",
          message: "Ocorreu um erro ao realizar o cadastro do paciente",
        };
      }
    );
  }
}
</script>

<style scoped></style>
