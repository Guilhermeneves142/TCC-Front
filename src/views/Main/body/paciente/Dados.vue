<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="primary">
          <span class="text-h5 white--text">{{ data.nome }}</span>
          <v-spacer />
          <span class="white--text">{{ idade }} anos</span>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ data.telefone }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer />

            <v-list-item-content>
              <v-list-item-title>{{ data.celular }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ data.email }}</v-list-item-title>
            </v-list-item-content>

            <v-spacer />
            <v-list-item-content>
              <v-list-item-title>{{ data.sexo }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-flag-checkered</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-select
                no-data-text="Sem dados disponiveis"
                item-text="nome"
                clearable
                item-value="id"
                multiple
                solo
                flat
                readonly
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img src="https://picsum.photos/700?image=996" height="200px"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import PacienteService from "@/services/PacienteService";
import moment from "moment";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Dados extends Vue {
  @Prop() id!: string;
  data: Paciente.Paciente = {
    consultorio: { id: "" },
    objetivos: [],
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    dataNascimento: "",
    genero: "",
    id: "",
  };

  get idade() {
    return moment().year() - moment(this.data.dataNascimento).year();
  }

  async mounted() {
    this.data = await PacienteService.findById(this.id);
  }
}
</script>

<style scoped></style>
