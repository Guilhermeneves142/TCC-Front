<template>
  <div>
    <menu-superior />
    <div class="d-flex" style="margin-top: 3em">
      <Menu style="margin-top: 3em" />
      <router-view style="margin-left: 3.5em; width: 100vw" />
    </div>
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
