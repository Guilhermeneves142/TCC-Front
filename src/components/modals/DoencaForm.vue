<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="20em">
      <v-card>
        <v-card-title>
          <span class="text-h5">Doença</span>
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
                    v-model="doenca.nome"
                    :rules="rules.nome"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="doenca.descricao"
                    label="Descrição"
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
import DoencaService from "@/services/DoencaService";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DoencaForm extends Vue {
  @Prop({ required: false }) id!: string;
  dialog = true;
  loading = false;
  valid = false;
  doenca: Doenca.Doenca = {
    id: null,
    consultorio: {
      id: "",
      nome: "",
      telefone: "",
      endereco: "",
    },
    nome: "",
    descricao: "",
    default: false,
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
      this.doenca = await DoencaService.findById(this.id).finally(
        () => (this.loading = false)
      );
    }
  }

  get rules() {
    return {
      nome: [(v: string) => !!v || "Nome é obrigatório"],
    };
  }

  get consultorio() {
    return this.$store.state.idConsultorio;
  }

  get doencaToSave() {
    if (this.id == null) {
      return {
        id: null,
        consultorio: {
          id: this.consultorio,
        },
        nome: this.doenca.nome,
        descricao: this.doenca.descricao,
        default: false,
      };
    } else {
      return this.doenca;
    }
  }

  save() {
    this.loading = true;
    DoencaService.save(this.doencaToSave)
      .then(
        () => {
          this.notification = {
            open: true,
            color: "sucesso",
            title: "Cadastro realizado",
            message: "O doença foi cadastrado com sucesso",
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
            message: "Ocorreu um erro ao realizar o cadastro da doença",
          };
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  close() {
    this.dialog = false;
    this.$router.back();
  }
}
</script>

<style scoped></style>
