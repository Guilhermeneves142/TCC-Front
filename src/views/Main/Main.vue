<template>
  <div>
    <menu-superior />
    <div class="d-flex" style="margin-top: 3em">
      <Menu style="margin-top: 3em" @calculadora="openCalculadora = true" />
      <router-view style="margin-left: 3.5em; width: 100vw" />

      <calculadora v-model="openCalculadora" />
    </div>
  </div>
</template>

<script lang="ts">
import LoginService from "@/services/LoginService";
import { Component, Vue } from "vue-property-decorator";
import Menu from "./header/Menu.vue";
import MenuSuperior from "./header/MenuSuperior.vue";
import calculadora from "@/components/global/Calculadora.vue";

@Component({
  components: {
    Menu,
    MenuSuperior,
    calculadora,
  },
})
export default class Main extends Vue {
  openCalculadora = false;
  mounted(): void {
    LoginService.clarifyToken();
  }
}
</script>
