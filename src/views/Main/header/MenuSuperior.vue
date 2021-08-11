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
    <v-tabs right>
      <v-tab v-for="(item, index) in menu" :key="index" @click="go(item.route)">
        <div class="d-flex">
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
          <span>{{ item.text }}</span>
        </div></v-tab
      >
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MenuSuperior extends Vue {
  menu = [
    { text: "Atendimento", icon: "mdi-chart-areaspline", route: "Atendimento" },
    { text: "Paciente", icon: "mdi-account-outline", route: "Paciente" },
    { text: "Alimento", icon: "mdi-food-apple-outline", route: "Alimento" },
    { text: "Agenda", icon: "mdi-calendar-month", route: "Agenda" },
  ];

  go(name: string) {
    this.$router.push({ name });
  }
}
</script>

<style scoped></style>
