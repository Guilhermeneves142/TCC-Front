<template>
  <div>
    <v-card flat style="width: 60%; margin: 0 auto">
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h3 class="title">Planos Alimentares</h3></div>
          <div class="d-flex" style="width: 60%">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
              class="mr-8"
            />
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
        :headers="header"
        :items="planosAlimentares"
        no-data-text="Sem items cadastrados"
        :search="search"
        @click:row="open($event.id)"
        :footer-props="{
          itemsPerPageText: 'items por página',
          itemsPerPageOptions: [4, 5, 6],
        }"
      />
    </v-card>
    <router-view />
  </div>
</template>

<script lang="ts">
import PlanoAlimentarService from "@/services/PlanoAlimentarService";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class PlanoAlimentar extends Vue {
  search = "";
  planosAlimentares: PlanoAlimentar.PlanoAlimentar[] = [];

  get header() {
    return [
      {
        text: "Nome",
        value: "nome",
      },
    ];
  }

  async mounted() {
    this.planosAlimentares = await PlanoAlimentarService.findAll();
  }

  open(id: string) {
    if (id) this.$router.push({ name: "EditPlanoAlimentar", params: { id } });
    else this.$router.push({ name: "NewPlanoAlimentar" });
  }

  @Watch("$route")
  async handleRouteChanged() {
    this.planosAlimentares = await PlanoAlimentarService.findAll();
  }
}
</script>

<style scoped></style>
