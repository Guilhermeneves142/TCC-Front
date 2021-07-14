<template>
  <v-card class="pa-6 login">
    <v-card-title class="mb-12">
      <h1 class="title-login">Nutrisier</h1>
    </v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-text-field
          label="Email ou CPF"
          class="py-5"
          dense
          prepend-inner-icon="mdi-account-outline"
        />
      </v-row>
      <v-row align="center" class="mx-0">
        <v-text-field
          label="Senha"
          dense
          class="py-5"
          prepend-inner-icon="mdi-lock-outline"
        />
      </v-row>
      <v-row justify="end">
        <v-col cols="auto">
          <a>Esqueceu a senha?</a>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="mt-16">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="primary" outlined @click="createNewUser">
            Sign up
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn depressed color="primary"> Log in </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  createNewUser() {
    this.$router.push({ name: "NewUser" });
  }
}
</script>

<style scoped>
.login {
  margin-right: 15%;
  width: 30vw;
  height: 90vh;
  box-shadow: 0 0 3em rgba(15, 15, 15, 0.3) !important;
}
.title-login {
  color: rgb(66, 66, 66);
}
</style>
