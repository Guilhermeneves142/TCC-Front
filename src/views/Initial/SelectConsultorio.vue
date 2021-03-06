<template>
  <v-card class="pa-6 newUser mx-auto" width="50em">
    <v-card-title> Cadastro de consultorio </v-card-title>
    <v-card-text v-if="!newConsultorio">
      <v-select
        v-model="consultorio"
        :items="consultorios"
        item-text="nome"
        item-value="id"
        outlined
        label="Consultorios"
        persistent-hint
        return-object
        single-line
      />
      <a @click="newConsultorio = true"> Deseja criar um consultorio? </a>
    </v-card-text>
    <v-card-text v-else>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              label="Nome *"
              v-model="consultorio.nome"
              :rules="rules.nome"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Endereço *"
              v-model="consultorio.endereco"
              :rules="rules.endereco"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Telefone *"
              required
              :rules="rules.telefone"
              v-model="consultorio.telefone"
            />
          </v-col>

          <v-col>
            <v-text-field label="Celular" v-model="consultorio.celular" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider />
    <v-card-actions>
      <v-row align="end" justify="end" class="pa-4">
        <v-col v-if="newConsultorio">
          <a @click="newConsultorio = false" class="pb-1">Voltar</a>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="save" :disabled="!valid"
            >Cadastrar</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
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
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ConsultorioService from "@/services/ConsultorioService";
import NutricionistaService from "@/services/NutricionistaService";

@Component
export default class SelectConsultorio extends Vue {
  notification = {
    open: false,
    color: "error",
    title: "Usuário criado com sucesso",
    message: "",
  };
  newConsultorio = false;
  valid = true;
  consultorios: Consultorio.Consultorio[] = [];
  consultorio: Consultorio.Consultorio = {
    id: "",
    nome: "",
    telefone: "",
    endereco: "",
  };

  async mounted() {
    this.consultorios = await ConsultorioService.findAll();
  }

  get rules(): unknown {
    return {
      nome: [(v: string) => !!v || "Nome obrigatório"],
      telefone: [(v: string) => !!v || "Telefone obrigatório"],
      endereco: [(v: string) => !!v || "Endereço obrigatório"],
    };
  }

  get idNutricionista(): string {
    return this.$store.state.idNutricionista;
  }

  save(): void {
    if (this.newConsultorio) {
      ConsultorioService.createNewConsultorio(
        this.consultorio,
        this.idNutricionista
      ).then(
        () => {
          this.notification = {
            open: true,
            color: "error",
            title: "Cadastro realizado",
            message: "O consultorio foi cadastrado com sucesso",
          };
          this.notification.color = "success";
          this.notification.open = true;
          this.$router.push({ name: "Main" });
        },
        () => {
          this.notification = {
            open: true,
            color: "error",
            title: "Erro ao cadastrar consultorio",
            message: "Verifique se os dados inseridos estão corretos",
          };
        }
      );
    } else {
      NutricionistaService.selectConsultorio(
        this.idNutricionista,
        this.consultorio.id
      ).then(
        () => {
          this.notification = {
            open: true,
            color: "success",
            title: "Cadastro realizado",
            message: "O nutricionista foi inserido no consultorio",
          };
          setTimeout(() => {
            this.$router.push({ name: "Main" });
          }, 1000);
        },
        () => {
          this.notification = {
            open: true,
            color: "error",
            title: "Erro ao cadastrar",
            message: "Ocorreu um ao vincular o nutricionista ao consultorio",
          };
        }
      );
    }
  }
}
</script>

<style scoped></style>
