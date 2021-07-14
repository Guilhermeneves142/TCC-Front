<template>
  <v-container id="screen" fluid>
    <transition name="slide-fade">
      <router-view />
    </transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Initial extends Vue {}
</script>

<style scoped>
#screen {
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/18.jpg");
  background-size: 70% 100%;
  background-color: #1b7b99;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.slide-fade-enter-active {
  transition: all 1s;
}
.slide-fade-leave-active {
  transition: all 4s cubic-bezier(1, 0.5, 0.8, 1) ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
