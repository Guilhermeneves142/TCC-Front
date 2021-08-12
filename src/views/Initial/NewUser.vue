<template>
  <v-card class="pa-6 newUser mx-auto">
    <div class="d-flex">
      <div class="user-visualization">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-avatar color="primary" size="200">
                <span class="white--text text-h1">{{ abreviacao }}</span>
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
                  label="Nome completo *"
                  v-model="user.nome"
                  :rules="rules.nome"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="CPF *"
                  required
                  v-model="user.cpf"
                  :rules="rules.cpf"
                />
              </v-col>

              <v-col>
                <v-text-field
                  label="CRN *"
                  v-model="user.crn"
                  :rules="rules.crn"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Email *"
                  required
                  v-model="user.email"
                  :rules="rules.email"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Celular *"
                  required
                  v-model="user.celular"
                  :rules="rules.celular"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Senha *"
                  required
                  :rules="rules.senha"
                  type="password"
                  v-model="user.senha"
                />
              </v-col>

              <v-col>
                <v-text-field
                  label="Confirme sua senha *"
                  type="password"
                  :rules="rules.confirmarSenha"
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
              <v-btn color="primary" @click="save" :disabled="!valid"
                >Cadastrar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </div>
    </div>
    <v-snackbar
      v-model="notification.open"
      :color="notification.color"
      vertical
      right
      :timeout="2500"
      top
    >
      <h2>{{ notification.title }}</h2>
      <hr class="mt-2 mb-2" />
      <span>{{ notification.message }}</span>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import LoginService from "@/services/LoginService";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewUser extends Vue {
  valid = false;
  color = "error";
  notification = {
    open: false,
    color: "error",
    title: "Usuário criado com sucesso",
    message: "",
  };
  // eslint-disable-next-line no-undef
  user: Nutricionista.Nutricionista = {
    nome: "",
    cpf: "",
    crn: "",
    senha: "",
    email: "",
    celular: "",
    consultorio: {
      id: "",
      nome: "",
      telefone: "",
      endereco: "",
    },
  };

  get senhaAsterisco(): string {
    return this.user.senha.replace(/\w|\W/g, "*");
  }

  get abreviacao(): string {
    let abreviacao = "";
    this.user.nome.split(" ").map((e, index) => {
      if (index <= 1) abreviacao += e.substring(0, 1);
    });
    return abreviacao;
  }

  get rules(): unknown {
    return {
      nome: [(v: string) => !!v || "Nome obrigatório"],
      senha: [(v: string) => !!v || "Senha obrigatória"],
      crn: [(v: string) => !!v || "CRN obrigatória"],
      cpf: [(v: string) => !!v || "CPF obrigatório"],
      email: [(v: string) => !!v || "Email obrigatório"],
      celular: [(v: string) => !!v || "Celular obrigatório"],
      confirmarSenha: [
        (v: string) => !!v || "Senha obrigatória",
        (v: string) => v == this.user.senha || "As senhas devem ser iguais",
      ],
    };
  }

  save(): void {
    LoginService.createNewUser(this.user).then(
      () => {
        this.notification = {
          open: true,
          color: "sucesso",
          title: "Cadastro realizado",
          message: "O nutricionista foi cadastrado com sucesso",
        };
        setTimeout(() => {
          this.$router.back();
        }, 1500);
      },
      () => {
        this.notification = {
          open: true,
          color: "error",
          title: "Erro ao cadastrar nutricionista",
          message: "Verifique se os dados inseridos estão corretos",
        };
      }
    );
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
