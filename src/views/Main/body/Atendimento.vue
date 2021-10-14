<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-tabs v-model="tab" align-with-title v-if="id">
            <v-tabs-slider color="grey"></v-tabs-slider>

            <v-tab
              v-for="(item, index) in items"
              :key="index"
              :disabled="item == block"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Paciente"
            no-data-text="Sem dados disponiveis"
            v-model="id"
            :items="pacientes"
            item-text="nome"
            clearable
            item-value="id"
          />
        </v-col>
        <v-col cols="3" class="mt-3" v-if="tab == 1 || !id">
          <v-btn
            color="primary"
            dark
            v-if="!id"
            class="mb-2"
            @click="newPaciente()"
          >
            Novo paciente
          </v-btn>
          <v-btn
            color="primary"
            v-else
            dark
            class="mb-2"
            @click="(block = ''), (tab = 0)"
          >
            Novo atendimento
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs-items v-model="tab" v-if="id">
            <v-tab-item v-for="item in items" :key="item">
              <v-card flat>
                <component
                  :is="component"
                  @alterComponent="alterTab($event)"
                  :id="id"
                />
              </v-card>
            </v-tab-item> </v-tabs-items
        ></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import PacienteService from "@/services/PacienteService";
import { Component, Vue, Watch } from "vue-property-decorator";
import AtendimentoTab from "./Atendimento/Atendimento.vue";
import HistoricoTab from "./Atendimento/Historico.vue";

@Component
export default class Atendimento extends Vue {
  pacientes: Paciente.Paciente[] = [];
  tab = 1;
  id = "";
  items = ["Atendimento", "Historico"];
  block = "Atendimento";

  get component() {
    if (this.tab == 0) return AtendimentoTab;
    else return HistoricoTab;
  }

  async mounted() {
    this.pacientes = await PacienteService.findAll();
  }

  alterTab() {
    this.tab = this.tab ? 0 : 1;
  }

  newPaciente() {
    this.$store.commit("CREATING_NEW_PACIENTE", true);
    this.$router.push({ name: "NewPaciente" });
  }

  get idPaciente() {
    return this.$store.state.idPaciente;
  }

  @Watch("idPaciente", { immediate: true })
  handlePacienteCreatedChanged() {
    this.id = this.idPaciente;
  }
}
</script>

<style scoped></style>
