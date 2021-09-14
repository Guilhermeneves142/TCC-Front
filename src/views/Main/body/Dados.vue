<template>
  <div>
    <v-card flat>
      <v-card-title style="height: 3.5em" class="mb-7">
        <div>Dados</div>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          height="100%"
          v-if="readonly"
          @click="readonly = false"
        >
          Editar
        </v-btn>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          height="100%"
          v-else
          @click="readonly = true"
        >
          Voltar
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col>
              {{ nutricionista.nome }}
              <v-label for="nome"> Nome </v-label>
              <v-text-field
                v-model="nutricionista.nome"
                single-line
                hide-details
                id="nome"
                solo
                autofocus
                prepend-icon="mdi-account-outline"
                flat
                :readonly="readonly"
                class="mr-8"
              />
            </v-col>
            <v-col>
              <v-label for="cpf"> CPF </v-label>
              <v-text-field
                v-model="nutricionista.cpf"
                single-line
                hide-details
                id="cpf"
                prepend-icon="mdi-alpha-c-circle-outline"
                solo
                flat
                :readonly="readonly"
                class="mr-8"
              />
            </v-col>
            <v-col>
              <v-label for="crn"> CRN </v-label>
              <v-text-field
                v-model="nutricionista.crn"
                single-line
                hide-details
                id="crn"
                solo
                prepend-icon="mdi-apple-keyboard-option"
                flat
                :readonly="readonly"
                class="mr-8"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-label for="email"> E-mail </v-label>
              <v-text-field
                v-model="nutricionista.email"
                single-line
                hide-details
                id="email"
                solo
                prepend-icon="mdi-email-outline"
                flat
                :readonly="readonly"
                class="mr-8"
              />
            </v-col>
            <v-col>
              <v-label for="celular"> Celular </v-label>
              <v-text-field
                v-model="nutricionista.celular"
                single-line
                hide-details
                id="celular"
                solo
                flat
                prepend-icon="mdi-cellphone"
                color="primary"
                :readonly="readonly"
                class="mr-8"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-label for="consultorio"> Consultorio </v-label>
              <v-text-field
                v-model="nutricionista.consultorio.nome"
                single-line
                hide-details
                id="consultorio"
                solo
                flat
                readonly
                v-if="readonly"
                class="mr-8"
              />
              <v-select
                v-model="nutricionista.consultorio.id"
                :items="consultorios"
                item-text="nome"
                item-value="id"
                outlined
                v-else
                label="Consultorios"
                persistent-hint
                return-object
                single-line
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NutricionistService from "@/services/NutricionistaService";
import ConsultorioService from "@/services/ConsultorioService";

@Component
export default class Dados extends Vue {
  valid = false;
  readonly = true;
  consultorios: Consultorio.Consultorio[] = [];
  nutricionista: Nutricionista.Nutricionista = {
    nome: "",
    cpf: "",
    crn: "",
    senha: "",
    email: "",
    celular: "",
    id: "",
    inicioExpediente: "08:00",
    fimExpediente: "18:00",
    consultorio: {
      id: "",
      nome: "",
      telefone: "",
      endereco: "",
      celular: "",
    },
  };

  get idNutricionista() {
    return this.$store.state.idNutricionista;
  }

  async mounted() {
    this.consultorios = await ConsultorioService.findAll();
    this.nutricionista = await NutricionistService.findById(
      this.idNutricionista
    );
  }
}
</script>

<style scoped></style>
