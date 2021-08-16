<template>
  <v-card flat>
    <v-card-title>
      <v-row class="d-flex justify-space-between ma-4">
        <div><h3 class="title">Objetivos</h3></div>
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
            dark
            class="mb-2"
            @click="open()"
            height="100%"
          >
            Cadastrar
          </v-btn>
        </div>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="objetivos"
      :search="search"
      @click:row="open($event.id)"
      no-data-text="Sem items cadastrados"
      :footer-props="{
        itemsPerPageText: 'items por página',
        itemsPerPageOptions: [4, 5, 6],
      }"
    ></v-data-table>
    <router-view />
  </v-card>
</template>

<script lang="ts">
import ObjectiveService from "@/services/ObjectiveService";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Objetivos extends Vue {
  search = "";
  headers = [
    {
      text: "Nome",
      align: "start",
      value: "nome",
    },
    { text: "Descrição", value: "descricao" },
  ];
  objetivos: Objective.Objective[] = [];

  async mounted() {
    this.objetivos = await ObjectiveService.findAll();
  }

  open(id: string | null = null) {
    if (id) this.$router.push({ name: "EditObjetivo", params: { id } });
    else this.$router.push({ name: "NewObjetivo" });
  }

  @Watch("$route")
  async handleRouterChanged() {
    this.objetivos = await ObjectiveService.findAll();
  }
}
</script>

<style scoped></style>
