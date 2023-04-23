<template>
  <v-card class="card pa-4 text-center">
    <h1 class="t4">Remover usuário</h1>
    <p>Tem certeza de que deseja remover o usuário?</p>
    <p class="my-0 d-flex flex-column flex-sm-row">
      <b> Nome: </b>
      <v-spacer></v-spacer>
      {{ data.name }}
    </p>
    <p class="my-0 d-flex flex-column flex-sm-row">
      <b> Email: </b>
      <v-spacer></v-spacer>
      {{ data.email }}
    </p>
    <p class="my-0 d-flex flex-column flex-sm-row">
      <b> Pontos: </b>
      <v-spacer></v-spacer>
      {{ data.points }}
    </p>

    <div class="d-flex justify-end mt-4">
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
        color="error"
        depressed
        :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
        @click="$emit('removed')"
      >
        Remover
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'UsersRemove',

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
