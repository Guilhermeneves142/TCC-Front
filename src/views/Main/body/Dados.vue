<template>
  <div>
    <v-card flat>
      <v-card-title style="height: 3.5em" class="mb-7">
        <div>Dados</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" height="100%"> Editar </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col>
              <v-label for="nome"> Nome </v-label>
              <v-text-field
                v-model="nutricionista.nome"
                single-line
                hide-details
                id="nome"
                solo
                flat
                readonly=""
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
                solo
                flat
                readonly=""
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
                flat
                readonly=""
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
                flat
                readonly=""
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
                readonly=""
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

@Component
export default class Dados extends Vue {
  valid = false;
  readonly = true;
  // eslint-disable-next-line no-undef
  consultorios: Consultorio.Consultorio[] = [];
  // eslint-disable-next-line no-undef
  nutricionista: Nutricionista.Nutricionista = {
    nome: "Guilherme Neves Trindade",
    cpf: "",
    crn: "",
    senha: "",
    email: "",
    celular: "",
    id: "",
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
    this.nutricionista = await NutricionistService.findById(
      this.idNutricionista
    );
  }
}
</script>

<style scoped></style>
