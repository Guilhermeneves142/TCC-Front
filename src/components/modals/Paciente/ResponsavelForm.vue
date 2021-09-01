<template>
  <v-expansion-panels flat v-model="value">
    <v-expansion-panel>
      <v-expansion-panel-content>
        <v-text-field
          v-model="trip.name"
          placeholder="Caribbean Cruise"
        ></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResponsavelForm extends Vue {
  @Prop() value!: number;
  trip = {
    name: "",
    location: null,
    start: null,
    end: null,
  };
}
</script>

<style scoped></style>
