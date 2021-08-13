<template>
  <v-card class="pa-6 login">
    <v-card-title class="mb-12">
      <v-row align="start">
        <v-col cols="10">
          <v-img src="../../assets/logo.png" max-width="300" />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-row align="center" class="mx-0">
          <v-text-field
            label="Email ou CPF"
            class="py-5"
            dense
            required
            v-model="login.usuario"
            :rules="rules.usuario"
            prepend-inner-icon="mdi-account-outline"
          />
        </v-row>
        <v-row align="center" class="mx-0">
          <v-text-field
            label="Senha"
            dense
            class="py-5"
            required
            type="password"
            v-model="login.senha"
            :rules="rules.senha"
            @keyup.enter="signIn"
            prepend-inner-icon="mdi-lock-outline"
          />
        </v-row>
      </v-form>
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
            Cadastre-se
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn depressed color="primary" @click="signIn" :disabled="!valid">
            Entrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-snackbar
      v-model="error"
      color="error"
      vertical
      right
      :timeout="2500"
      top
    >
      <h2>Usuário ou senha incorretos</h2>
      <hr class="mt-2 mb-2" />
      <span>Verifique se você digitou os dados corretamente.</span>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginService from "@/services/LoginService";

@Component
export default class Login extends Vue {
  login: Login.Login = {
    usuario: "",
    senha: "",
  };
  error = false;
  valid = false;
  createNewUser(): void {
    this.$router.push({ name: "NewUser" });
  }
  signIn(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate())
      LoginService.login(this.login).then(
        (e) => {
          const clarify = {
            idNutricionista: e.data.idNutricionista,
            nome: e.data.nome,
            consultorio: e.data.consultorio,
          };
          this.$store.commit("LOGIN", e.token);
          this.$store.commit("CLARIFY", clarify);
          this.$router.push({
            name: e.hasConsultorio ? "Main" : "NewConsultorio",
          });
        },
        () => {
          this.error = true;
        }
      );
  }

  get rules(): unknown {
    return {
      usuario: [(v: string) => !!v || "Usuário obrigatório"],
      senha: [(v: string) => !!v || "Senha obrigatória"],
    };
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
</style>
