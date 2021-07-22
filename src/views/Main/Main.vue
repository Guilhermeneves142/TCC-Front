<template>
  <div>
    <Menu />
  </div>
</template>

<script lang="ts">
import LoginService from "@/services/LoginService";
import { Component, Vue } from "vue-property-decorator";
import Menu from "@/views/Main/header/Menu.vue";

@Component({
  components: {
    Menu,
  },
})
export default class Main extends Vue {
  mounted(): void {
    LoginService.clarifyToken();
  }
}
</script>
