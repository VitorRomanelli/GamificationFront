<template>
  <v-card class="pa-4 card">
    <div class="d-flex">
      <div class="pa-2">
        <h1 class="t4">{{ editing ? 'Atualizar' : 'Adicionar' }} Conquista</h1>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon fab @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-form ref="form">
      <v-row class="ma-0" dense>
        <v-col>
          <v-text-field
            v-model="conquest.title"
            label="Título"
            outlined
            :rules="[(v) => !!v || 'Digite um título']"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-select
            v-model="conquest.to"
            :items="toItems"
            item-text="text"
            item-value="value"
            append-icon="mdi-chevron-down"
            label="Para"
            menu-props="auto"
            single-line
            outlined
            :rules="[(v) => v != null || 'Selecione uma opção']"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="conquest.description"
            label="Descrição"
            rows="3"
            outlined
            :rules="[(v) => !!v || 'Digite uma descrição para a conquista']"
          ></v-textarea>
        </v-col>

        <v-col>
          <v-select
            v-model="conquest.type"
            :items="types"
            item-text="text"
            item-value="value"
            append-icon="mdi-chevron-down"
            label="Objetivo alvo"
            menu-props="auto"
            single-line
            outlined
            :rules="[(v) => v != null || 'Selecione uma opção']"
          ></v-select>
        </v-col>

        <v-col>
          <v-text-field
            v-model="conquest.endDate"
            label="Data limite"
            type="date"
            outlined
          ></v-text-field>
        </v-col>

        <v-col v-if="conquest.type == 0">
          <v-text-field
            v-model="conquest.points"
            label="Número de pontos"
            type="number"
            outlined
            :rules="[(v) => !!v || 'Insira o número de pontos']"
          ></v-text-field>
        </v-col>

        <v-col v-if="conquest.type == 1">
          <v-text-field
            v-model="conquest.servicesConcludedCount"
            label="Número de serviços"
            type="number"
            outlined
            :rules="[(v) => !!v || 'Insira o número de serviços']"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            color="primary"
            outlined
            class="mr-2"
            :disabled="$nuxt.$loading ? $nuxt.$loading.loading : false"
            @click="$emit('close')"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            depressed
            :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
            @click="submit"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'ConquestManage',

  props: {
    conquestId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editing: false,
      conquest: {},
      types: [
        {
          text: 'Pontos',
          value: 0,
        },
        {
          text: 'Serviços Concluídos',
          value: 1,
        },
      ],
      toItems: [
        {
          text: 'Usuário',
          value: 0,
        },
        {
          text: 'Setor',
          value: 1,
        },
      ],
    }
  },

  fetch() {
    if (this.conquestId) {
      this.editing = true
      this.$axios.$get(`conquest/${this.conquestId}`).then((response) => {
        this.conquest = response
        this.conquest.endDate = this.conquest.endDate
          ? this.conquest.endDate.split('T')[0]
          : ''
      })
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.editing) {
          this.$axios.$put('conquest', this.conquest).then(() => {
            this.$toast.success('Conquista atualizado com sucesso!')
            this.$emit('saved')
          })
        } else {
          this.$axios.$post('conquest', this.conquest).then(() => {
            this.$toast.success('Conquista cadastrado com sucesso!')
            this.$emit('saved')
          })
        }
      }
    },
  },
}
</script>

<style></style>
