<template>
  <div>
    <menu-superior />
    <Menu />
  </div>
</template>

<script lang="ts">
import LoginService from "@/services/LoginService";
import { Component, Vue } from "vue-property-decorator";
import Menu from "./header/Menu.vue";
import MenuSuperior from "./header/MenuSuperior.vue";

@Component({
  components: {
    Menu,
    MenuSuperior,
  },
})
export default class Main extends Vue {
  mounted(): void {
    LoginService.clarifyToken();
  }
}
</script>
