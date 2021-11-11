<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="50em">
      <v-card>
        <v-card-title>
          <span class="text-h5">Plano Alimentar</span>
          <v-spacer />
          <v-btn icon :disabled="loading" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Nome*"
                    v-model="planoAlimentar.nome"
                    :rules="rules.nome"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn width="100%" color="primary" @click="addItem">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <div
                v-for="(refeicao, index) in planoAlimentar.refeicoes"
                :key="index"
                class="items-refeicao"
              >
                <v-row>
                  <v-col>
                    <v-select
                      label="Refeicao*"
                      no-data-text="Sem dados disponiveis"
                      v-model="refeicao.refeicao"
                      :items="refeicoes"
                      :rules="rules.refeicao"
                      item-text="nome"
                      item-value="id"
                      return-object
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Horário*"
                      v-model="refeicao.horario"
                      :rules="rules.horario"
                      type="time"
                      required
                    />
                  </v-col>
                  <v-col cols="1">
                    <v-btn icon @click="removeItem(index)">
                      <v-icon> mdi-trash-can-outline </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      label="Alimentos*"
                      no-data-text="Sem dados disponiveis"
                      v-model="refeicao.alimentos"
                      :rules="rules.alimentos"
                      :items="alimentos"
                      item-text="nome"
                      clearable
                      item-value="id"
                      multiple
                      return-object
                    />
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-form>
          <small>*Campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="close"
            outlined
            text
            :disabled="loading"
          >
            Voltar
          </v-btn>
          <v-btn
            color="primary"
            @click="save"
            :disabled="loading || !valid || qttRefeicoes == 0"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="notification.open"
      :color="notification.color"
      vertical
      right
      :timeout="2500"
      top
    >
      <h2>{{ notification.title }}</h2>
      <hr class="mt-2 mb-2" />
      <span>{{ notification.message }}</span>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import AlimentoService from "@/services/AlimentoService";
import RefeicaoService from "@/services/RefeicaoService";
import PlanoAlimentarService from "@/services/PlanoAlimentarService";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PlanoAlimentarForm extends Vue {
  @Prop() id!: string;
  loading = false;
  valid = false;
  dialog = true;
  refeicoes: Refeicao.Refeicao[] = [];
  alimentos: Alimento.Alimento[] = [];
  notification = {
    open: false,
    color: "success",
    title: "Plano alimentar criado com sucesso",
    message: "",
  };
  planoAlimentar: PlanoAlimentar.PlanoAlimentar = {
    nome: "",
    refeicoes: [],
    consultorio: {
      id: "",
    },
  };

  async mounted() {
    if (this.id)
      this.planoAlimentar = await PlanoAlimentarService.findById(this.id);
    this.refeicoes = await RefeicaoService.findAll();
    this.alimentos = await AlimentoService.findAll();
    this.planoAlimentar.consultorio.id = this.consultorio;
  }

  get consultorio() {
    return this.$store.state.idConsultorio;
  }

  get qttRefeicoes() {
    return this.planoAlimentar.refeicoes.length;
  }

  get rules() {
    return {
      nome: [(v: string) => !!v || "Nome é obrigatório"],
      refeicao: [(v: string) => !!v || "Refeicao é obrigatório"],
      horario: [(v: string) => !!v || "Horário é obrigatório"],
      alimentos: [
        (v: Alimento.Alimento[]) =>
          v.length > 0 || "Alimentos são obrigatórios",
      ],
    };
  }

  close() {
    this.$router.back();
  }

  async save() {
    try {
      this.loading = true;
      await PlanoAlimentarService.save(this.planoAlimentar);
      this.notification = {
        open: true,
        color: "success",
        title: "Cadastro realizado",
        message: "O plano alimentar foi cadastrado com sucesso",
      };
      this.close();
    } catch (error) {
      this.notification = {
        open: true,
        color: "error",
        title: "Erro ao realizar cadastro",
        message: "Ocorreu um erro ao cadastrar o plano alimentar",
      };
    } finally {
      this.loading = false;
    }
  }

  addItem() {
    const newItem: PlanoAlimentar.PlanoAlimentarRefeicao = {
      refeicao: { id: "" },
      horario: "",
      alimentos: [],
    };
    this.planoAlimentar.refeicoes.push(newItem);
  }

  removeItem(index: number) {
    this.planoAlimentar.refeicoes.splice(index, 1);
  }
}
</script>

<style scoped>
.items-refeicao {
  margin: 1em;
  border: 0.5px solid rgb(184, 182, 182);
  border-radius: 0.7em;
  padding: 1em;
}
</style>
