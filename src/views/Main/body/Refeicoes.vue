<template>
  <div>
    <v-card flat style="width: 60%; margin: 0 auto">
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h3 class="title">Refeições</h3></div>
          <div class="d-flex" style="width: 60%">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
              class="mr-8"
            ></v-text-field>
            <v-btn color="primary" dark class="mb-2" height="100%">
              Cadastrar
            </v-btn>
          </div>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="refeicoes"
        dense
        no-data-text="Sem items cadastrados"
        :search="search"
        :footer-props="{
          itemsPerPageText: 'items por página',
          itemsPerPageOptions: [4, 5, 6],
        }"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RefeicaoService from "@/services/RefeicaoService";

@Component
export default class Doencas extends Vue {
  search = "";
  headers = [
    {
      text: "Nome",
      value: "nome",
    },
  ];
  refeicoes: Refeicao.Refeicao[] = [];

  async mounted() {
    this.refeicoes = await RefeicaoService.findAll();
  }
}
</script>

<style scoped></style>
