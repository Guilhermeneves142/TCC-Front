<template>
  <v-card flat>
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="grey"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item" :disabled="!id">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <component
            :is="component"
            @alterComponent="alterTab($event)"
            :id="id"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <router-view />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dados from "./paciente/Dados.vue";
import Listagem from "./paciente/Listagem.vue";

@Component
export default class Paciente extends Vue {
  tab = 1;
  id = "";
  items = ["Dados", "Listagem"];

  get component() {
    if (this.tab == 0) return Dados;
    else return Listagem;
  }

  alterTab(id = "") {
    this.tab = this.tab ? 0 : 1;
    this.id = id;
  }
}
</script>

<style scoped></style>
