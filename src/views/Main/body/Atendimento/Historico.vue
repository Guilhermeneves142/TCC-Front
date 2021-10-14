<template>
  <div>
    <h2>Histórico</h2>
    <v-row class="mt-5">
      <v-col cols="6">
        <Grafico
          v-model="peso"
          nome="Peso (Kg)"
          unidade="Kg"
          color="blue-grey"
        />
      </v-col>
      <v-col cols="6">
        <Grafico
          v-model="altura"
          nome="Altura (Cm)"
          unidade="cm"
          color="light-green"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Grafico from "@/components/global/Grafico.vue";

@Component({
  components: {
    Grafico,
  },
})
export default class Historico extends Vue {
  altura = [100, 110, 150, 180];
  peso = [50, 60, 70, 80, 78, 83, 84, 72];
}
</script>

<style scoped></style>
