<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Álcool"
          :items="frequency"
          hide-details
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Tabagismo"
          :items="frequency"
          hide-details
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-text-field label="Sono" type="time" dense />
      </v-col>
      <v-col cols="3">
        <a>{{ dataAtual }}</a>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Patrica de exercícios"
          :items="exerciceFrequency"
          hide-details
          v-model="praticaExercicios"
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Apetite"
          :items="apetite"
          hide-details
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Mastigação"
          :items="mastigacao"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="3">
        <v-text-field dense label="Consumo de água (em litros)" type="number" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          no-data-text="Sem dados disponiveis"
          label="Alergia alimentar"
          hide-details
          :items="alimentos"
          item-text="nome"
          return-object
          class="my-6"
          multiple
          dense
        />
        <v-autocomplete
          no-data-text="Sem dados disponiveis"
          label="
        Intôlerâncias alimentares"
          hide-details
          :items="alimentos"
          item-text="nome"
          return-object
          class="my-6"
          multiple
          dense
        />
        <v-autocomplete
          no-data-text="Sem dados disponiveis"
          label="Aversões alimentares"
          class="my-6"
          hide-details
          :items="alimentos"
          item-text="nome"
          return-object
          multiple
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea label="Hábito Urinário" dense />
      </v-col>
      <v-col>
        <v-textarea label="Hábito Intestinal" dense />
      </v-col>
      <v-col>
        <v-textarea label="Medicamentos" dense />
      </v-col>
      <v-col>
        <v-textarea label="Observações gerais" dense />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import AlimentoService from "@/services/AlimentoService";
import moment from "moment";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Anamneses extends Vue {
  alimentos: Alimento.Alimento[] = [];
  praticaExercicios = "";

  async mounted() {
    this.alimentos = await AlimentoService.findAll();
  }
  get dataAtual() {
    return moment().format("DD/MM/YYYY HH:mm");
  }
  get frequency() {
    return ["Frequentemente", "Socialmente", "Não"];
  }
  get exerciceFrequency() {
    return ["Sedentario", "Pouco ativo", "Ativo", "Muito ativo"];
  }
  get apetite() {
    return ["Normal", "Diminuido", "Acelerado"];
  }
  get mastigacao() {
    return ["Rapida", "Normal", "Lenta"];
  }

  @Watch("praticaExercicios")
  handlePraticaExerciciosChanged() {
    this.$store.commit("EXERCICIOS", this.praticaExercicios);
  }
}
</script>

<style scoped></style>
