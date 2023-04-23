<template>
  <v-card class="pa-4 card">
    <div class="d-flex">
      <div class="pa-2">
        <h1 class="t4">{{ editing ? 'Atualizar' : 'Adicionar' }} Setor</h1>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon fab @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-form ref="form">
      <v-row class="ma-0" dense>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="sector.name"
            label="Nome"
            outlined
            :rules="[(v) => !!v || 'Digite um nome para o setor']"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            v-model="sector.supervisorId"
            :items="users"
            item-text="email"
            item-value="id"
            append-icon="mdi-chevron-down"
            label="Supervisor"
            menu-props="auto"
            single-line
            outlined
            :rules="[(v) => !!v || 'Selecione o supervisor']"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="sector.description"
            label="Descrição"
            rows="3"
            outlined
            :rules="[(v) => !!v || 'Digite uma descrição para o setor']"
          ></v-textarea>
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
  name: 'ManageSectors',

  props: {
    id: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      sector: {},
      editing: false,
      users: [],
    }
  },

  fetch() {
    if (this.id) {
      this.editing = true
      this.$axios.$get(`sector/${this.id}`).then((response) => {
        this.sector = response.content
      })
    }

    this.$axios.$get('user/list/supervisor').then((response) => {
      this.users = response.content
    })
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.editing) {
          this.$axios.$put('sector', this.sector).then(() => {
            this.$toast.success('Setor atualizado com sucesso!')
            this.$emit('saved')
          })
        } else {
          this.$axios.$post('sector', this.sector).then(() => {
            this.$toast.success('Setor cadastrado com sucesso!')
            this.$emit('saved')
          })
        }
      }
    },
  },
}
</script>

<style></style>
