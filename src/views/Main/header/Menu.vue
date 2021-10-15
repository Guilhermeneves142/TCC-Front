<template>
  <v-navigation-drawer
    v-model="drawer"
    color="primary"
    dark
    fixed
    :mini-variant.sync="mini"
    permanent
    expand-on-hover
  >
    <v-list-item class="px-2">
      <v-list-item-avatar class="avatar">{{ iniciais }} </v-list-item-avatar>

      <v-list-item-title>{{ nome }}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="go(item)"
      >
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
    {
      title: "Cadastro de doenças",
      icon: "mdi-emoticon-sick-outline",
      rota: "Doencas",
    },
    {
      title: "Cadastro de objetivos",
      icon: "mdi-flag-checkered",
      rota: "Objetivos",
    },
    {
      title: "Cadastro de Plano Alimentar",
      icon: "mdi-chart-areaspline",
      rota: "PlanoAlimentar",
    },
    {
      title: "Cadastro de refeições",
      icon: "mdi-food-apple-outline",
      rota: "Refeicoes",
    },
    { title: "Calculadora", icon: "mdi-calculator", open: true },
    { title: "Meus dados", icon: "mdi-account-outline", rota: "Dados" },
    { title: "Sair", icon: "mdi-logout", rota: "Login" },
  ];

  get nome(): string {
    return this.$store.state.nome;
  }

  get iniciais() {
    return this.nome
      .split(" ")
      .map((e) => e.charAt(0))
      .join()
      .replace(/,/g, "");
  }

  go(route: { rota: string; open: boolean }) {
    if (route.open) {
      this.$emit("calculadora", true);
    } else this.$router.push({ name: route.rota });
  }
}
</script>

<style scoped>
.avatar {
  border: 1px solid rgb(59, 252, 0);
  border-radius: 5em;
  background-color: rgba(223, 231, 235, 0.2);
}
</style>
