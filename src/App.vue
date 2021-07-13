<template>
  <v-app>
    <!-- <router-view /> -->
    <Login />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/views/Login.vue";

@Component({
  components: {
    Login,
  },
})
export default class App extends Vue {}
</script>
