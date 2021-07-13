<template>
  <v-container id="screen" fluid>
    <section id="logo">
      <div class="borda-cinza">
        <h1>Nutrisier</h1>
        <sub>Evoluindo com a nutrição</sub>
      </div>
    </section>
    <section id="login" class="dark-mode">
      <div>
        <v-text-field label="Login" outlined color="white" dark></v-text-field>
        <v-text-field label="Senha" outlined color="white" dark></v-text-field>
      </div>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>

<style scoped>
#screen {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: aquamarine; */
  width: 60vw;
  height: 100vh;
  margin-left: -4%;
  font-size: 3em;
  background-image: url("../../public/images/18.jpg");
}
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45vw;
  margin-right: -4%;
  height: 100vh;
}
.borda-cinza {
  border-radius: 0.5em;
  padding: 1em;
  width: 70%;
  height: 10em;
  background-color: rgba(46, 46, 46, 0.4);
  color: white;
}
.dark-mode {
  background-color: rgb(37, 37, 37);
  color: white;
}
.light-mode {
  background-color: white;
}
</style>
