<template>
  <v-card class="card pa-4">
    <h1 class="t4">Atualizar status do pedido</h1>
    <p>Tem certeza de que deseja atualizar o status do pedido?</p>

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

    <div class="my-3 text-center">
      <p class="bold">Atualização de estado para:</p>
      <v-chip :color="getColor(data.step)" large>
        {{ data.stepString }}
      </v-chip>
    </div>

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
        color="primary"
        depressed
        :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
        @click="$emit('updated')"
      >
        Salvar
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'OrderStatusUpdate',

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    getColor(value) {
      value = value * 50
      if (value <= 30) {
        return 'error'
      }

      if (value <= 60) {
        return 'accent'
      }

      return 'success'
    },
  },
}
</script>

<style lang="scss" scoped></style>
