<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header hide-actions>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="7">
              <span v-if="open">Responsavel</span>
            </v-col>

            <v-col cols="3">
              <v-btn color="primary" dark class="mt-3">
                Criar novo Responsavel
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ResponsavelForm extends Vue {
  trip = {
    name: "",
    location: null,
    start: null,
    end: null,
  };
}
</script>

<style scoped></style>
