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
                    label="Email *"
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
                <v-col cols="12"> </v-col>
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
import ObjectiveService from "@/services/ObjectiveService";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PacienteForm extends Vue {
  dialog = true;
  loading = false;
  valid = false;
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
  objetivos: Objective.Objective[] = [];

  async mounted() {
    this.objetivos = await ObjectiveService.findAll();
  }

  get rules() {
    return {
      nome: [(v: string) => !!v || "Nome é obrigatório"],
    };
  }

  close() {
    this.dialog = false;
    this.$router.back();
  }

  save() {
    console.log("salvo");
  }
}
</script>

<style scoped></style>
