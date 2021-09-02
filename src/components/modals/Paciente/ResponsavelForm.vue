<template>
  <v-expansion-panels flat v-model="value">
    <v-expansion-panel>
      <v-expansion-panel-content>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field label="Nome *" v-model="responsavel.nome" />
            </v-col>
            <v-col>
              <v-text-field label="CPF *" v-model="responsavel.cpf" />
            </v-col>
            <v-col>
              <v-text-field label="E-mail *" v-model="responsavel.email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Celular *" v-model="responsavel.celular" />
            </v-col>
            <v-col>
              <v-text-field label="Telefone *" v-model="responsavel.telefone" />
            </v-col>
            <v-col>
              <v-text-field label="endereço *" v-model="responsavel.endereco" />
            </v-col>
          </v-row>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class ResponsavelForm extends Vue {
  @Prop() value!: number;
  responsavel: Responsavel.Responsavel = {
    consultorio: { id: "" },
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    celular: "",
    endereco: "",
  };

  @Watch("responsavel", { deep: true })
  handleResponsavelChanged() {
    this.$emit("responsavel", this.responsavel);
  }
}
</script>

<style scoped></style>
