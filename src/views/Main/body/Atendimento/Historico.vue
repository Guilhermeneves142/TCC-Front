<template>
  <div>
    <h2>Histórico</h2>
    <v-row class="mt-5">
      <v-col cols="6" v-if="peso.length > 1">
        <Grafico
          v-model="peso"
          nome="Peso (Kg)"
          unidade="Kg"
          color="blue-grey"
        />
      </v-col>
      <v-col cols="6" v-if="altura.length > 1">
        <Grafico
          v-model="altura"
          nome="Altura (Cm)"
          unidade="cm"
          color="light-green"
        />
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="6" v-if="massaMagra.length > 1">
        <Grafico
          v-model="massaMagra"
          nome="Massa Magra (%)"
          unidade="%"
          color="blue-grey"
        />
      </v-col>
      <v-col cols="6" v-if="massaGorda.length > 1">
        <Grafico
          v-model="massaGorda"
          nome="Massa Gorda (%)"
          unidade="%"
          color="light-green"
        />
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="6" v-if="IMC.length > 1">
        <Grafico v-model="IMC" nome="IMC" color="blue-grey" />
      </v-col>
      <v-col cols="6" v-if="GEB.length > 1">
        <Grafico v-model="GEB" nome="GEB" color="light-green" />
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="6" v-if="GET.length > 1">
        <Grafico v-model="GET" nome="GET" color="blue-grey" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Grafico from "@/components/global/Grafico.vue";
import AtendimentoService from "@/services/AtendimentoService";
import calcs from "@/utils/calcs";
import moment from "moment";

@Component({
  components: {
    Grafico,
  },
})
export default class Historico extends Vue {
  @Prop() id!: string;
  data: Atendimento.Atendimento[] = [];

  async mounted() {
    if (this.id)
      this.data = await AtendimentoService.findDataToHistoric(this.id);
  }

  get peso() {
    return this.data
      .filter((e) => e.antropometrico != null)
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => Number(e.antropometrico?.peso));
  }

  get altura() {
    return this.data
      .filter((e) => e.antropometrico != null)
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => Number(e.antropometrico?.altura));
  }

  get massaMagra() {
    return this.data
      .filter((e) => e.antropometrico != null)
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => Number(e.antropometrico?.massaMagra));
  }

  get massaGorda() {
    return this.data
      .filter((e) => e.antropometrico != null)
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => Number(e.antropometrico?.massaGorda));
  }

  get IMC() {
    return this.data
      .filter(
        (e) =>
          e.antropometrico != null &&
          e.antropometrico?.peso &&
          e.antropometrico?.altura
      )
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => {
        if (e.antropometrico?.peso && e.antropometrico?.altura)
          return Number(
            calcs.IMC(e.antropometrico.peso, e.antropometrico.altura).toFixed(2)
          );
      });
  }

  get GEB() {
    return this.data
      .filter(
        (e) =>
          e.antropometrico != null &&
          e.antropometrico?.peso &&
          e.antropometrico?.altura
      )
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => {
        const { genero, dataNascimento } = e.paciente as Paciente.Paciente;
        if (e.antropometrico?.peso && e.antropometrico?.altura)
          return Number(
            calcs
              .GEB(
                genero,
                this.calcIdade(dataNascimento),
                e.antropometrico.peso,
                e.antropometrico.altura / 100
              )
              ?.toFixed(2)
          );
      });
  }

  get GET() {
    return this.data
      .filter(
        (e) =>
          e.antropometrico != null &&
          e.antropometrico?.peso &&
          e.antropometrico?.altura &&
          e.anamneses?.praticaExercicios
      )
      .sort((a, b) => {
        if (moment(a.createdOn).valueOf() > moment(b.createdOn).valueOf())
          return 1;
        else if (moment(a.createdOn).valueOf() < moment(b.createdOn).valueOf())
          return -1;
        else return 0;
      })
      .map((e) => {
        const { genero, dataNascimento } = e.paciente as Paciente.Paciente;
        if (
          e.antropometrico?.peso &&
          e.antropometrico?.altura &&
          e.anamneses?.praticaExercicios
        )
          return Number(
            calcs
              .GET(
                genero,
                this.calcIdade(dataNascimento),
                e.antropometrico.peso,
                e.antropometrico.altura / 100,
                e.anamneses.praticaExercicios
              )
              ?.toFixed(2)
          );
      });
  }

  calcIdade(data: string) {
    return Number(moment(data).locale("pt-br").fromNow().replace(/\D/g, ""));
  }
}
</script>

<style scoped></style>
