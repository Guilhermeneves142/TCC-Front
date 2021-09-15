<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="20em">
      <v-card>
        <v-card-title>
          <span class="text-h5">Refeição</span>
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
                    v-model="refeicao.nome"
                    :rules="rules.nome"
                    required
                  ></v-text-field>
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
import RefeicaoService from "@/services/RefeicaoService";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ObjectiveForm extends Vue {
  @Prop({ required: false }) id!: string;
  dialog = true;
  loading = false;
  valid = false;
  refeicao: Refeicao.Refeicao = {
    consultorio: {
      id: "",
    },
    nome: "",
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
      this.refeicao = await RefeicaoService.findById(this.id).finally(
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

  get refeicaoToSave() {
    return {
      consultorio: {
        id: this.consultorio,
      },
      nome: this.refeicao.nome,
      default: false,
    };
  }

  save() {
    this.loading = true;
    RefeicaoService.save(this.refeicaoToSave)
      .then(
        () => {
          this.notification = {
            open: true,
            color: "success",
            title: "Cadastro realizado",
            message: "A refeição foi cadastrada com sucesso",
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
            message: "Ocorreu um erro ao realizar o cadastro de refeição",
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
