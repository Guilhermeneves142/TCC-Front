<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="primary">
          <span class="text-h5 white--text">Sarah Mcbeal</span>
          <v-spacer />
          <span class="white--text">28 anos</span>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
            </v-list-item-content>
            <v-spacer />

            <v-list-item-content>
              <v-list-item-title>(323) 555-6789</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>mcbeal@example.com</v-list-item-title>
            </v-list-item-content>

            <v-spacer />
            <v-list-item-content>
              <v-list-item-title>Masculino</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-flag-checkered</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-select
                no-data-text="Sem dados disponiveis"
                item-text="nome"
                clearable
                item-value="id"
                multiple
                solo
                flat
                readonly
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img src="https://picsum.photos/700?image=996" height="200px"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dados extends Vue {
  @Prop() id!: string;
}
</script>

<style scoped></style>
