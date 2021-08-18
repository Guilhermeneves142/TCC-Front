<template>
  <v-container fluid>
    <v-data-iterator
      :items="alimentos"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      no-data-text="Sem items cadastrados"
      :no-results-text="`Não foram encontrados itens relacionados a: ${search}`"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar flat color="white" class="mb-1">
          <v-text-field
            v-model="search"
            flat
            solo
            dense
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Buscar"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo
              hide-details
              :items="keys"
              item-text="name"
              item-value="key"
              prepend-inner-icon="mdi-magnify"
              label="Ordenar por"
              clearable
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn
                large
                depressed
                :color="sortDesc ? 'grey' : 'primary'"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                :color="sortDesc ? 'primary' : 'grey'"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card outlined>
              <v-card-title class="subheading font-weight-bold">
                {{ item.nome }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{
                      'blue--text': sortBy === key.key,
                      'text-caption': true,
                    }"
                  >
                    {{ key.name }}:
                  </v-list-item-content>
                  <v-spacer />
                  <v-list-item-content
                    class="align-end"
                    :class="{
                      'blue--text': sortBy === key.key,
                      'text-caption': true,
                    }"
                  >
                    {{ item[key.key] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

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
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AlimentoService from "@/services/AlimentoService";

@Component
export default class Alimento extends Vue {
  itemsPerPageArray = [4, 8, 12];
  search = "";
  filter = {};
  sortDesc = false;
  page = 1;
  itemsPerPage = 4;
  sortBy = "name";
  keys = [
    { key: "nome", name: "Nome" },
    { key: "proteina", name: "Proteina" },
    { key: "carboidrato", name: "Carboidrato" },
    { key: "lipideos", name: "Lipideos" },
    { key: "energia", name: "Energia" },
    { key: "fibraAlimentar", name: "Fibra Alimentar" },
    { key: "vitaminaC", name: "Vitamina C" },
    { key: "cinzas", name: "Cinzas" },
    { key: "calcio", name: "Calcio" },
    { key: "magnesio", name: "Magnesio" },
    { key: "manganes", name: "Manganes" },
    { key: "fosforo", name: "Fosforo" },
    { key: "ferro", name: "Ferro" },
    { key: "sodio", name: "Sodio" },
    { key: "potassio", name: "Potassio" },
    { key: "cobre", name: "Cobre" },
    { key: "tiamina", name: "Tiamina" },
    { key: "riboflavina", name: "Riboflavina" },
    { key: "pirodoxina", name: "Pirodoxina" },
    { key: "niacina", name: "Niacina" },
  ];
  alimentos: Alimento.Alimento[] = [];

  async mounted() {
    this.alimentos = await AlimentoService.findAll();
  }

  get numberOfPages() {
    return Math.ceil(this.alimentos.length / this.itemsPerPage);
  }
  get filteredKeys() {
    return this.keys.filter((key) => key.key !== "nome");
  }
  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }
  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }
  updateItemsPerPage(items: number) {
    this.itemsPerPage = items;
  }
}
</script>

<style scoped></style>
