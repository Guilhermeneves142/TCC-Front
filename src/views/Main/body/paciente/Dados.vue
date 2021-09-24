<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="primary">
          <span class="text-h5 white--text">{{ data.nome }}</span>
          <v-spacer />
          <div>
            <span class="white--text">{{ idade }} anos</span>
            <v-btn icon color="white" class="ml-8" @click="editPaciente">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ data.telefone }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>
            <v-list-item-content class="ml-8">
              <v-list-item-title>{{ data.celular }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ data.email }}</v-list-item-title>
            </v-list-item-content>

            <v-spacer />
            <v-list-item-action>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content class="ml-8">
              <v-list-item-title>{{ data.genero }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-flag-checkered</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-action-text
                v-for="(objetivo, index) in data.objetivos"
                :key="index"
              >
                {{ index + 1 + " - " + objetivo.nome }}
              </v-list-item-action-text>
            </v-list-item-content>

            <v-spacer />
            <v-list-item-action>
              <v-icon>mdi-emoticon-sick-outline</v-icon>
            </v-list-item-action>

            <v-list-item-content class="ml-8">
              <v-list-item-action-text
                v-for="(doenca, index) in data.doencas"
                :key="index"
              >
                {{ index + 1 + " - " + doenca.nome }}
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img src="https://picsum.photos/700?image=996" height="200px"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import PacienteService from "@/services/PacienteService";
import moment from "moment";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Dados extends Vue {
  @Prop() id!: string;
  data: Paciente.Paciente = {
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

  get idade() {
    return moment().year() - moment(this.data.dataNascimento).year();
  }

  async mounted() {
    this.data = await PacienteService.findById(this.id);
  }

  editPaciente() {
    this.$router.push({ name: "EditPaciente", params: { id: this.id } });
  }

  @Watch("$route")
  async handleRouterChanged() {
    this.data = await PacienteService.findById(this.id);
  }
}
</script>

<style scoped></style>
