<template>
  <v-app-bar color="primary" dense dark app>
    <v-toolbar-title
      ><v-img
        src="../../../assets/logo-light.png"
        height="40"
        width="150"
      ></v-img
    ></v-toolbar-title>

    <v-spacer></v-spacer>
    <section class="d-flex justify-space-between" style="width: 30em">
      <v-menu left bottom v-for="(item, index) in menu" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <span v-bind="attrs" v-on="on">{{ item.text }}</span>
          </div>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </section>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MenuSuperior extends Vue {
  menu = [
    { text: "Atendimento", icon: "mdi-chart-areaspline" },
    { text: "Paciente", icon: "mdi-account-outline" },
    { text: "Alimento", icon: "mdi-food-apple-outline" },
    { text: "Agenda", icon: "mdi-calendar-month" },
  ];
}
</script>

<style scoped></style>
