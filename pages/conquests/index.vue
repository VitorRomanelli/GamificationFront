<template>
  <div>
    <Header
      title="Conquistas"
      description="Gerencie as metas e conquistas do sistema"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img src="timeline-amico.svg" max-height="380" contain></v-img>
      </v-col>
    </Header>

    <div class="d-flex px-3">
      <v-btn
        width="49%"
        class="card"
        :color="tab == 0 ? 'primary' : 'white'"
        height="70"
        @click="tab = 0"
      >
        Em andamento
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        width="49%"
        class="card"
        :color="tab == 1 ? 'primary' : 'white'"
        height="70"
        @click="tab = 1"
      >
        Completas
      </v-btn>
    </div>

    <div v-if="tab == 0">
      <ConquestsInProgress />
    </div>

    <div v-else>
      <ConquestsCompleted />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConquestsPage',

  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<style scoped></style>
