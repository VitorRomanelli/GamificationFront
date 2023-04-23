<template>
  <v-card class="card pa-4">
    <h1 class="t4">Remover pedido</h1>
    <p>Tem certeza de que deseja remover o pedido?</p>

    <p class="my-0 d-flex flex-column flex-sm-row">
      <b> ID: </b>
      <v-spacer></v-spacer>
      {{ data.id }}
    </p>

    <p class="my-0 d-flex flex-column flex-sm-row">
      <b> Título: </b>
      <v-spacer></v-spacer>
      {{ data.title }}
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
  name: 'OrderRemove',

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
