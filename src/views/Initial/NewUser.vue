<template>
  <v-card class="pa-6 newUser mx-auto">
    <div class="d-flex">
      <div class="user-visualization">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-avatar color="primary" size="200">
                <span class="white--text text-h1">GN</span>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>Nome: {{ user.nome }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>CPF: {{ user.cpf }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>CRN: {{ user.crn }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>Email: {{ user.email }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>Celular: {{ user.celular }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>Senha: {{ senhaAsterisco }}</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div style="width: 100%">
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col>
                <v-text-field
                  label="Nome completo"
                  v-model="user.nome"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="CPF" required v-model="user.cpf" />
              </v-col>

              <v-col>
                <v-text-field label="CRN" v-model="user.crn" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Email" required v-model="user.email" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Celular" required v-model="user.celular" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Senha"
                  required
                  type="password"
                  v-model="user.senha"
                />
              </v-col>

              <v-col>
                <v-text-field
                  label="Confirme sua senha"
                  type="password"
                  required
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <v-row align="end" justify="end" class="pa-4">
            <v-col>
              <router-link :to="{ name: 'Login' }" class="pb-1"
                >Voltar</router-link
              >
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary">Cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewUser extends Vue {
  valid = false;
  user = {
    nome: "",
    email: "",
    crn: "",
    cpf: "",
    celular: "",
    senha: "",
  };

  get senhaAsterisco() {
    return this.user.senha.replace(/\w|\W/g, "*");
  }
}
</script>

<style scoped>
.newUser {
  height: 90vh;
  width: 70vw;
  box-shadow: 0 0 3em rgba(15, 15, 15, 0.3) !important;
  padding: 0 0 1em 0 !important;
}
.title-login {
  color: rgb(66, 66, 66);
}
.user-visualization {
  background-color: rgb(29, 29, 29);
  width: 65%;
  height: 90vh;
}
span {
  color: white;
}
</style>
