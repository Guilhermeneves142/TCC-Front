<template>
  <v-card class="pa-6 newUser mx-auto"> teste </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewUser extends Vue {}
</script>

<style scoped>
.newUser {
  height: 90vh;
  width: 70vw;
  box-shadow: 0 0 3em rgba(15, 15, 15, 0.3) !important;
}
.title-login {
  color: rgb(66, 66, 66);
}
</style>
