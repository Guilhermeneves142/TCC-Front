<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/views/Initial/Initial.vue";

@Component({
  components: {
    Login,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  font-family: "Open Sans", sans-serif;
}
</style>
