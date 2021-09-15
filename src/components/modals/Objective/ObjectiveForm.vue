<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="20em">
      <v-card>
        <v-card-title>
          <span class="text-h5">Objetivo</span>
          <v-spacer />
          <v-btn icon :disabled="loading" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome*"
                    v-model="objetivo.nome"
                    :rules="rules.nome"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="objetivo.descricao"
                    label="Descrição*"
                    :rules="rules.descricao"
                    auto-grow
                  />
                </v-col>
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
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ObjectiveForm extends Vue {
  @Prop({ required: false }) id!: string;
  dialog = true;
  loading = false;
  valid = false;
  objetivo: Objective.Objective = {
    consultorio: {
      id: "",
    },
    nome: "",
    descricao: "",
  };
  notification = {
    open: false,
    color: "error",
    title: "Usuário criado com sucesso",
    message: "",
  };

  async mounted() {
    if (this.id) {
      this.loading = true;
      this.objetivo = await ObjectiveService.findById(this.id).finally(
        () => (this.loading = false)
      );
    }
  }

  get rules() {
    return {
      nome: [(v: string) => !!v || "Nome é obrigatório"],
      descricao: [(v: string) => !!v || "Descricao é obrigatória"],
    };
  }

  get consultorio() {
    return this.$store.state.idConsultorio;
  }

  get objectiveToSave() {
    if (this.id == null) {
      return {
        consultorio: {
          id: this.consultorio,
        },
        nome: this.objetivo.nome,
        descricao: this.objetivo.descricao,
      };
    } else return this.objetivo;
  }

  save() {
    this.loading = true;
    ObjectiveService.save(this.objectiveToSave)
      .then(
        () => {
          this.notification = {
            open: true,
            color: "success",
            title: "Cadastro realizado",
            message: "O objetivo foi cadastrado com sucesso",
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
            message: "Ocorreu um erro ao realizar o cadastro de objetivo",
          };
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  close() {
    this.$router.back();
  }
}
</script>

<style scoped></style>
