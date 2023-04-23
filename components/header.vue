<template>
  <div>
    <v-row class="ma-0" align="center">
      <v-col cols="12" sm="6">
        <h1 class="t3">{{ title }}</h1>
        <p class="label">{{ description }}</p>
      </v-col>

      <slot />
    </v-row>
    <v-divider class="my-6 mx-4"></v-divider>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',

  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
