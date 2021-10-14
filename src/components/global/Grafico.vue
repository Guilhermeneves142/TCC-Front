<template>
  <v-card class="mx-auto text-center" :color="color" dark max-width="600">
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item"
            >{{ item.value }} {{ unidade }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">{{ nome }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from "vue-property-decorator";

@Component
export default class Grafico extends Vue {
  @Model() value!: number[];
  @Prop() nome!: string;
  @Prop() unidade!: string;
  @Prop() color!: string;
}
</script>

<style scoped></style>
