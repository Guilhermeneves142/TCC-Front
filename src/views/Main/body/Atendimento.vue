<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="grey"></v-tabs-slider>

            <v-tab v-for="(item, index) in items" :key="index">
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Paciente"
            no-data-text="Sem dados disponiveis"
            v-model="paciente"
            :items="pacientes"
            item-text="nome"
            clearable
            item-value="id"
            multiple
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item">
              <v-card flat>
                <component :is="component" @alterComponent="alterTab($event)" />
              </v-card>
            </v-tab-item> </v-tabs-items
        ></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import PacienteService from "@/services/PacienteService";
import { Component, Vue } from "vue-property-decorator";
import AtendimentoTab from "./Atendimento/Atendimento.vue";
import HistoricoTab from "./Atendimento/Historico.vue";

@Component
export default class Atendimento extends Vue {
  paciente = "";
  pacientes: Paciente.Paciente[] = [];
  tab = 0;
  items = ["Atendimento", "Historico"];

  get component() {
    if (this.tab == 0) return AtendimentoTab;
    else return HistoricoTab;
  }

  async mounted() {
    this.pacientes = await PacienteService.findAll();
  }

  alterTab(id = "") {
    this.tab = this.tab ? 0 : 1;
  }
}
</script>

<style scoped></style>
