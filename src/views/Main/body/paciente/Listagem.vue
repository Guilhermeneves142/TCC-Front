<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-row class="d-flex justify-space-between ma-4">
          <div><h3 class="title">Pacientes</h3></div>
          <div class="d-flex" style="width: 40%">
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
              @click="newPaciente"
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
        dense
        no-data-text="Sem items cadastrados"
        :no-results-text="`Não foram encontrados itens relacionados a: ${search}`"
        :items="pacientes"
        :headers="headers"
        :search="search"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:footer>
          <v-row class="ma-2" align="center" justify="center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <span class="grey--text">Items por página</span>
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Página {{ page }} de {{ numberOfPages }}
            </span>
            <v-btn fab dark color="primary" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="primary" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PacienteService from "@/services/PacienteService";

@Component
export default class Listagem extends Vue {
  search = "";

  itemsPerPageArray = [4, 8, 12];
  page = 1;
  numberOfPages = 1;
  itemsPerPage = 4;
  headers = [
    { text: "Nome", value: "nome", sort: false },
    { text: "Email", value: "email", sort: false },
  ];
  pacientes: Paciente.Paciente[] = [];

  async mounted() {
    this.pacientes = await PacienteService.findAll();
  }

  updateItemsPerPage(items: number) {
    this.itemsPerPage = items;
  }
  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }
  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }
  newPaciente() {
    this.$router.push({ name: "NewPaciente" });
  }
}
</script>

<style scoped></style>
