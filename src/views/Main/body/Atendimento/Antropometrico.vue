<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-text-field
          label="Altura"
          type="number"
          v-model="value.altura"
          suffix="cm"
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Peso"
          type="number"
          v-model="value.peso"
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
          <v-text-field
            v-model="value.ombroCircunferencia"
            label="Ombro"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.peitoralCircunferencia"
            label="Peitoral"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.cinturaCircunferencia"
            label="Cintura"
            type="number"
            suffix="cm"
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="value.abdomenCircunferencia"
            label="Abdômen"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.quadrilCircunferencia"
            label="Quadril"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.pescocoCircunferencia"
            label="Pescoço"
            type="number"
            suffix="cm"
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="value.panturrilhaDireitaCircunferencia"
            label="Panturrilha direita"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.panturrilhaEsquerdaCircunferencia"
            label="Panturrilha esquerda"
            type="number"
            suffix="cm"
            dense
          />

          <v-text-field
            v-model="value.coxaDireitaCircunferencia"
            label="Coxa direita"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.coxaEsquerdaCircunferencia"
            label="Coxa esquerda"
            type="number"
            suffix="cm"
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="value.bracoDireitoCircunferencia"
            label="Braço direito"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.bracoEsquerdoCircunferencia"
            label="Braço esquerdo"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.punhoCircunferencia"
            label="Punho"
            type="number"
            suffix="cm"
            dense
          />
          <v-text-field
            v-model="value.antrebraco"
            label="Antebraço"
            type="number"
            suffix="cm"
            dense
          />
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
            v-model="value.massaGorda"
            type="number"
            suffix="%"
            dense
          />
          <v-text-field
            label="Massa magra"
            v-model="value.massaMagra"
            type="number"
            suffix="%"
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="value.pesoResidual"
            label="Peso residual"
            type="number"
            suffix="kg"
            dense
          />
          <v-text-field
            v-model="value.pesoOsseo"
            label="Peso ósseo"
            type="number"
            suffix="kg"
            dense
          />
          <v-text-field
            v-model="value.pesoMuscula"
            label="Peso muscular"
            type="number"
            suffix="kg"
            dense
          />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";
import moment from "moment";
import calcs from "@/utils/calcs";
import PacienteService from "@/services/PacienteService";

@Component
export default class Antropometrico extends Vue {
  @Prop() id!: string;
  @Model() value!: Atendimento.Antropometrico;
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

  async mounted() {
    this.value.data = this.dataAtual;
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
    return calcs.IMC(this.value.peso, this.value.altura);
  }

  get massaGordaKg() {
    return calcs.massaKG(this.value.peso, this.value.massaGorda);
  }

  get massaMagraKg() {
    return calcs.massaKG(this.value.peso, this.value.massaMagra);
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
    this.$store.commit("ALTURA", this.value.altura / 100);
  }

  @Watch("peso")
  handlePesoChanged() {
    this.$store.commit("PESO", this.value.peso);
  }
}
</script>

<style scoped></style>
