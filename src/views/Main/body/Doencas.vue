<template>
  <v-card flat>
    <v-card-title>
      <v-row class="d-flex justify-space-between ma-4">
        <div><h3 class="title">Doenças</h3></div>
        <div class="d-flex" style="width: 40%">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            class="mr-8"
          ></v-text-field>
          <v-btn
            color="primary"
            @click="newDoenca"
            dark
            class="mb-2"
            height="100%"
          >
            Cadastrar
          </v-btn>
        </div>
      </v-row>
    </v-card-title>
    <v-data-table
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :headers="headers"
      :items="doencas"
      :search="search"
      no-data-text="Sem items cadastrados"
      item-key="nome"
      :footer-props="{
        itemsPerPageText: 'items por página',
        itemsPerPageOptions: [4, 5, 6],
      }"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <h3 class="my-2">Alimentos restritos</h3>
          <v-divider class="mb-2" />
          <div v-for="alimento in item.alimentos" class="mb-3" :key="alimento">
            Nome: {{ alimento }}
          </div>
        </td>
      </template>
    </v-data-table>
    <router-view />
  </v-card>
</template>

<script lang="ts">
import DoencaService from "@/services/DoencaService";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Doencas extends Vue {
  search = "";
  expanded = [];
  singleExpand = false;
  headers = [
    {
      text: "Nome",
      align: "start",
      value: "nome",
    },
    { text: "Definição", value: "definicao" },
    {
      text: "Alimentos Restritos",
      value: "data-table-expand",
    },
  ];
  // eslint-disable-next-line no-undef
  doencas: Doenca.Doenca[] = [];

  async mounted() {
    this.doencas = await DoencaService.findAll();
  }

  newDoenca() {
    this.$router.push({ name: "NewDoenca" });
  }
}
</script>

<style scoped></style>
