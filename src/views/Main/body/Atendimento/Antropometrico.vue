<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-text-field
          label="Altura"
          type="number"
          v-model="altura"
          suffix="cm"
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Peso"
          type="number"
          v-model="peso"
          suffix="kg"
          dense
        />
      </v-col>
      <v-col cols="3" class="d-flex align-center">
        <v-select
          :items="diagnostic"
          dense
          label="diagnostic"
          style="width: 20"
        />
      </v-col>
      <v-col cols="3" class="d-flex align-center flex-column">
        <a class="mb-2">{{ dataAtual }}</a>

        <v-label>{{ `Idade: ${idade}` }}</v-label>
      </v-col>
    </v-row>
    <v-card-subtitle> <h3>Circunferencias</h3> </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-text-field label="Ombro" type="number" suffix="cm" dense />
          <v-text-field label="Peitoral" type="number" suffix="cm" dense />
          <v-text-field label="Cintura" type="number" suffix="cm" dense />
        </v-col>
        <v-col cols="3">
          <v-text-field label="Abdômen" type="number" suffix="cm" dense />
          <v-text-field label="Quadril" type="number" suffix="cm" dense />
          <v-text-field label="Pescoço" type="number" suffix="cm" dense />
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Panturrilha direita"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            label="Panturrilha esquerda"
            type="number"
            suffix="cm"
            dense
          />

          <v-text-field label="Coxa direita" type="number" suffix="cm" dense />
          <v-text-field label="Coxa esquerda" type="number" suffix="cm" dense />
        </v-col>
        <v-col cols="3">
          <v-text-field label="Braço direito" type="number" suffix="cm" dense />
          <v-text-field
            label="Braço esquerdo"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field label="Punho" type="number" suffix="cm" dense />
          <v-text-field label="Antebraço" type="number" suffix="cm" dense />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle>
      <h3>Percentual de Gordura (bioimpedância)</h3>
    </v-card-subtitle>
    <v-card-text class="mt-3">
      <v-row>
        <v-col cols="3">
          <div>
            <v-label>IMC: </v-label>
            <span v-if="IMC">{{ IMC.toFixed(4) }} - {{ IMCDefinition }}</span>
          </div>
          <div class="my-8">
            <v-label>Massa Gorda (KG): </v-label>
            <span v-if="IMC">{{ massaGordaKg.toFixed(2) }} </span>
          </div>
          <div>
            <v-label>Massa Magra (KG): </v-label>
            <span v-if="IMC">{{ massaMagraKg.toFixed(2) }}</span>
          </div>
        </v-col>
        <v-col cols="3" class="d-flex flex-column justify-space-between">
          <v-text-field
            label="Massa gorda"
            v-model="massaGorda"
            type="number"
            suffix="%"
            dense
          />
          <v-text-field
            label="Massa magra"
            v-model="massaMagra"
            type="number"
            suffix="%"
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field label="Peso residual" type="number" suffix="kg" dense />
          <v-text-field label="Peso ósseo" type="number" suffix="kg" dense />
          <v-text-field label="Peso muscular" type="number" suffix="kg" dense />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import moment from "moment";
import calcs from "@/utils/calcs";
import PacienteService from "@/services/PacienteService";

@Component
export default class Antropometrico extends Vue {
  @Prop() id!: string;
  paciente: Paciente.Paciente = {
    consultorio: { id: "" },
    objetivos: [],
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    dataNascimento: "",
    genero: "",
    id: "",
    doencas: [],
  };
  peso = 0;
  altura = 0;
  massaGorda = 0;
  massaMagra = 0;

  async mounted() {
    this.paciente = await PacienteService.findById(this.id);
  }

  get dataAtual() {
    return moment().format("DD/MM/YYYY HH:mm");
  }

  get diagnostic() {
    return ["Magreza", "Normal", "Sobrepeso I", "Obesidade I", "Obesidade II"];
  }

  get idade() {
    return moment(this.paciente.dataNascimento)
      .locale("pt-br")
      .fromNow()
      .replace("há ", "");
  }

  get IMC() {
    return calcs.IMC(this.peso, this.altura);
  }

  get massaGordaKg() {
    return calcs.massaKG(this.peso, this.massaGorda);
  }

  get massaMagraKg() {
    return calcs.massaKG(this.peso, this.massaMagra);
  }

  get IMCDefinition() {
    const conditions = [
      { condition: this.IMC >= 40, definition: "Obesidade Grau III" },
      {
        condition: this.IMC <= 39.999 && this.IMC >= 35,
        definition: "Obesidade Grau II",
      },
      {
        condition: this.IMC <= 34.999 && this.IMC >= 30,
        definition: "Obesidade Grau I",
      },
      {
        condition: this.IMC <= 29.999 && this.IMC >= 25,
        definition: "Pré Obesidade",
      },
      {
        condition: this.IMC <= 24.999 && this.IMC >= 18.5,
        definition: "Eutrofia (normal)",
      },
      {
        condition: this.IMC <= 18.499 && this.IMC >= 17,
        definition: "Desnutrição Grau I",
      },
      {
        condition: this.IMC <= 16.999 && this.IMC >= 16,
        definition: "Desnutrição Grau II",
      },
      { condition: this.IMC < 16, definition: "Desnutrição Grau III" },
    ];

    return conditions.find((e) => e.condition)?.definition;
  }

  @Watch("altura")
  handleAlturaChanged() {
    this.$store.commit("ALTURA", this.altura / 100);
  }

  @Watch("peso")
  handlePesoChanged() {
    this.$store.commit("PESO", this.peso);
  }
}
</script>

<style scoped></style>
