<template>
  <v-card flat>
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="grey"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <component :is="component" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dados from "./paciente/Dados.vue";
import Listagem from "./paciente/Listagem.vue";

@Component
export default class Paciente extends Vue {
  tab = null;
  items = ["Dados", "Listagem"];

  get component() {
    if (this.tab == 0) return Dados;
    else return Listagem;
  }
}
</script>

<style scoped></style>
