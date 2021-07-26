<template>
  <v-navigation-drawer
    v-model="drawer"
    color="primary"
    dark
    :mini-variant.sync="mini"
    permanent
    height="95vh"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ nome }}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Menu extends Vue {
  drawer = true;
  mini = true;
  items = [
    { title: "Cadastro de doenças", icon: "mdi-emoticon-sick-outline" },
    { title: "Cadastro de objetivos", icon: "mdi-flag-checkered" },
    { title: "Cadastro de refeições", icon: "mdi-food-apple-outline" },
    { title: "Calculadora", icon: "mdi-calculator" },
    { title: "Meus dados", icon: "mdi-account-outline" },
    { title: "Sair", icon: "mdi-logout" },
  ];

  get nome(): string {
    return this.$store.state.nome;
  }
}
</script>

<style scoped></style>
