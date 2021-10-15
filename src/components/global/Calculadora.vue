<template>
  <v-dialog
    v-model="value"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Calculadora</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container class="d-flex justify-space-between">
          <div>
            <h2>Dados</h2>
            <v-text-field
              v-model="peso"
              label="peso"
              hide-details
              suffix="kg"
            />
            <v-text-field
              v-model="altura"
              label="altura"
              hide-details
              suffix="cm"
            />
            <v-text-field
              v-model="idade"
              label="idade"
              hide-details
              suffix="anos"
            />
            <v-autocomplete
              v-model="genero"
              label="Genero"
              :items="generos"
              no-data-text="Sem dados disponiveis"
            />
            <v-autocomplete
              v-model="praticaExercicios"
              label="nivel Atividade Fisica"
              :items="exercicios"
              no-data-text="Sem dados disponiveis"
            />
          </div>
          <div>
            <h2>Informações</h2>
            <div class="my-3">IMC: {{ IMC }}</div>
            <div class="my-3">GET: {{ GET }}</div>
            <div class="my-3">GEB: {{ GEB }}</div>
          </div>
          <div>
            <h2 class="ml-4">IMC</h2>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Definição</th>
                    <th class="text-left">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in definicoes"
                    :key="index"
                    :class="item.select ? 'red--text' : ''"
                  >
                    <td>{{ item.definicao }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="ml-4">Fonte: OMS, 1997</div>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import calcs from "@/utils/calcs";
import { Component, Model, Vue } from "vue-property-decorator";

@Component
export default class Calculadora extends Vue {
  @Model() value!: boolean;
  genero = "";
  idade = 0;
  peso = 0;
  altura = 0;
  praticaExercicios = "";
  generos = ["masculino", "feminino"];
  exercicios = ["Sedentario", "Pouco ativo", "Ativo", "Muito ativo"];

  close() {
    this.$emit("value", false);
  }

  get GEB() {
    return calcs
      .GEB(this.genero, this.idade, this.peso, this.altura)
      ?.toFixed(2);
  }

  get GET() {
    return calcs
      .GET(
        this.genero,
        this.idade,
        this.peso,
        this.altura,
        this.praticaExercicios
      )
      .toFixed(2);
  }

  get IMC() {
    return Number(calcs.IMC(this.peso, this.altura).toFixed(2));
  }

  get definicoes() {
    return [
      {
        value: ">= 40",
        definicao: "Obesidade Grau III",
        select: this.IMC >= 40,
      },
      {
        value: "35 até 39,9",
        definicao: "Obesidade Grau II",
        select: this.IMC >= 35 && this.IMC <= 39.9,
      },
      {
        value: "30 até 34,9",
        definicao: "Obesidade Grau I",
        select: this.IMC >= 30 && this.IMC <= 34.9,
      },
      {
        value: "25 até 29,9",
        definicao: "Pré Obesidade",
        select: this.IMC >= 25 && this.IMC <= 29.9,
      },
      {
        value: "18,5 até 24,9",
        definicao: "Eutrofia (normal)",
        select: this.IMC >= 18.5 && this.IMC <= 24.9,
      },
      {
        value: "17 até 18,4",
        definicao: "Desnutrição Grau I",
        select: this.IMC >= 17 && this.IMC <= 18.4,
      },
      {
        value: "16 até 16,9",
        definicao: "Desnutrição Grau II",
        select: this.IMC >= 16 && this.IMC <= 16.9,
      },
      {
        value: "< 16",
        definicao: "Desnutrição Grau III",
        select: this.IMC < 16,
      },
    ];
  }
}
</script>

<style scoped></style>
