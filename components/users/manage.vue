<template>
  <v-card class="pa-4" style="position: relative; border-radius: 10px">
    <div class="d-flex">
      <div class="pa-2">
        <h1 class="t4">{{ editing ? 'Atualizar' : 'Adicionar' }} Usuário</h1>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon fab @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-form ref="form">
      <v-row class="ma-0" dense>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.name"
            label="Nome"
            outlined
            :rules="[(v) => !!v || 'Digite seu nome']"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="user.email"
            label="E-mail"
            placeholder="example@mail.com"
            outlined
            :rules="[(v) => !!v || 'Digite seu e-mail']"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-select
            v-model="user.type"
            :disabled="editing"
            :items="userTypes"
            item-text="text"
            item-value="value"
            menu-props="auto"
            single-line
            append-icon="mdi-chevron-down"
            label="Tipo"
            outlined
            :rules="[(v) => v != null || 'Selecione o tipo do usuário']"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.phone"
            v-mask="['(##) #####-####', '(##) ####-####']"
            label="Telefone"
            placeholder="(##) #####-####"
            outlined
            :rules="[(v) => !!v || 'Digite seu telefone']"
          ></v-text-field>
        </v-col>

        <v-col v-if="user.type === 2" cols="12">
          <v-select
            v-model="user.sectorId"
            :items="sectors"
            item-text="name"
            item-value="id"
            menu-props="auto"
            single-line
            append-icon="mdi-chevron-down"
            label="Setor"
            outlined
            :rules="[(v) => v != null || 'Selecione o setor do usuário']"
          ></v-select>
        </v-col>

        <v-col v-if="!editing" cols="12" md="6">
          <v-text-field
            v-model="user.password"
            label="Senha"
            placeholder="********"
            outlined
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[
              (v) => !!v || 'Digite sua senha',
              (v) => v.length > 6 || 'Mínimo 6 caracteres',
            ]"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>

        <v-col v-if="!editing" cols="12" md="6">
          <v-text-field
            label="Senha"
            placeholder="********"
            outlined
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :rules="[
              (v) => !!v || 'Confirme sua senha',
              (v) => v == user.password || 'Senhas não conferem',
            ]"
            @click:append="show2 = !show2"
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
  name: 'ManageUser',

  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      sectors: [],
      userTypes: [
        { text: 'Administrador', value: 0 },
        { text: 'Supervisor', value: 1 },
        { text: 'Padrão', value: 2 },
      ],
      user: {
        password: '',
      },
      show: false,
      show2: false,
      editing: false,
    }
  },

  fetch() {
    if (this.userId) {
      this.editing = true
      this.$axios.$get(`user/${this.userId}`).then((response) => {
        this.user = response.content
      })
    }

    this.$axios.$get(`sector/list`).then((response) => {
      this.sectors = response.content
    })
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.user.type !== 2) {
          this.user.sectorId = null
        }

        if (this.editing) {
          this.$axios.$put('user', this.user).then(() => {
            this.$toast.success('Usuário atualizado com sucesso!')
            this.$emit('saved')
          })
        } else {
          this.$axios.$post('user', this.user).then(() => {
            this.$toast.success('Usuário cadastrado com sucesso!')
            this.$emit('saved')
          })
        }
      }
    },
  },
}
</script>

<style scoped></style>
