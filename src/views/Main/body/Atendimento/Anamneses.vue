<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Álcool"
          v-model="value.alcool"
          :items="frequency"
          hide-details
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Tabagismo"
          v-model="value.tabagismo"
          :items="frequency"
          hide-details
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-text-field label="Sono" type="number" dense v-model="value.sono" />
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
          v-model="value.praticaExercicios"
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Apetite"
          :items="apetite"
          v-model="value.apetite"
          hide-details
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          no-data-text="Sem dados disponiveis"
          label="Mastigação"
          :items="mastigacao"
          v-model="value.mastigacao"
          hide-details
          dense
        />
      </v-col>

      <v-col cols="3">
        <v-text-field
          dense
          label="Consumo de água (em litros)"
          type="number"
          v-model="value.consumoDagua"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          no-data-text="Sem dados disponiveis"
          label="Alergia alimentar"
          hide-details
          :items="alimentos"
          v-model="value.alergias"
          item-text="nome"
          return-object
          class="my-6"
          multiple
          dense
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          label="Hábito Urinário"
          dense
          v-model="value.habitoUrinario"
        />
      </v-col>
      <v-col>
        <v-textarea
          label="Hábito Intestinal"
          dense
          v-model="value.habitoIntestinal"
        />
      </v-col>
      <v-col>
        <v-textarea label="Medicamentos" dense v-model="value.medicamentos" />
      </v-col>
      <v-col>
        <v-textarea
          label="Observações gerais"
          dense
          v-model="value.observacoes"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import AlimentoService from "@/services/AlimentoService";
import moment from "moment";
import { Component, Model, Vue, Watch } from "vue-property-decorator";

@Component
export default class Anamneses extends Vue {
  @Model() value!: Atendimento.Anamneses;
  alimentos: Alimento.Alimento[] = [];
  praticaExercicios = "";

  async mounted() {
    this.value.data = this.dataAtual;
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
